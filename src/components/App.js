import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [cardDelete, setCardDelete] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [cards, setCards] = React.useState([]);

    const openedPopup =
        isEditProfilePopupOpen ||
        isAddPlacePopupOpen ||
        isEditAvatarPopupOpen ||
        cardDelete ||
        selectedCard;


    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setCardDelete(null);
        setSelectedCard(null)
    }

    function handleOverlayClick(e) {
        if(e.target === e.currentTarget) {
            closeAllPopups();
        }
    }

    React.useEffect(() => {
        function handleEscClose(e) {
            if(e.key === 'Escape') {
                closeAllPopups();
            }
        }

        if(openedPopup) {
            document.addEventListener('keydown', handleEscClose);
            return () => document.removeEventListener('keydown', handleEscClose);
        }

    }, [openedPopup])

    function handleEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function hadnleTrashClick(cardId) {
        setCardDelete(cardId);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.setUserInfo(data)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateAvatar({ avatar }) {
        setIsLoading(true);
        api.setAvatar({ avatar })
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleAddPlaceSubmit({ title, link }) {
        setIsLoading(true);
        api.addCard({ title, link })
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards(state => state.map(c => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleCardDelete(cardId) {
        setIsLoading(true);
        api.deleteCard(cardId)
            .then(() => {
                setCards(state => state.filter(a => a._id !== cardId));
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`))
            .finally(() => {
                setIsLoading(false);
            });
    }

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
        api.getCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, [])

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatar}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onTrashClick={hadnleTrashClick}
                />
                <Footer />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <ConfirmDeletePopup
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                    cardId={cardDelete}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                    onOverlayClick={handleOverlayClick}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    onOverlayClick={handleOverlayClick}
                />
            </div>
        </currentUserContext.Provider>
    );
}

export default App;
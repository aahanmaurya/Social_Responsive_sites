//SIDEBAR
const menuItems=document.querySelectorAll('.menu-item');

//MESSAGE
const messagenotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message =messages.querySelectorAll('.message');
const messageSearch =document.querySelector('#messages-search');

//THEME
const theme = document.querySelector('#theme');
const thememodal = document.querySelector('.customize-theme');
const fontsizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');

// =======================SIDEBAR======================

//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
};

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Handle notifications popup
        if (item.id === 'notifications') {
            document.querySelector('.notification-popup').style.display = 'block';
            const notificationCount = document.querySelector('#notifications .notification-count');
            if (notificationCount) {
                notificationCount.style.display = 'none';  // Hide notification count if it exists
            }
        } else {
            document.querySelector('.notification-popup').style.display = 'none';
        }

        // Toggle settings popup
        if (item.id === 'settings') {
            const settingsPopup = document.querySelector('.setting-popup');
            if (settingsPopup.style.display === 'block') {
                settingsPopup.style.display = 'none';  // Hide settings popup if it's currently displayed
            } else {
                settingsPopup.style.display = 'block';  // Show settings popup if it's not displayed
            }
        } else {
            document.querySelector('.setting-popup').style.display = 'none';
        }

        // Ensure only the active item has the 'active' class
        changeActiveItem();
        item.classList.add('active');
    });
});



//==============================MESSAGE====================
//search chat
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase(); // Get search value in lowercase
    
    message.forEach(chat => {
        const nameElement = chat.querySelector('h5'); // Use querySelector to get a single h5 element
        if (nameElement) {  // Check if h5 exists
            let name = nameElement.textContent.toLowerCase(); // Convert the name to lowercase
            if (name.indexOf(val) != -1) {
                chat.style.display = 'flex';  // Show message if it matches search
            } else {
                chat.style.display = 'none';  // Hide message if it doesn't match
            }
        }
    });
};


messageSearch.addEventListener('keyup',searchMessage);

messagenotification.addEventListener('click' , () =>{
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagenotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    },2000)
})

///-------------------- THEME customization ----------------------------------------

//OPEN MODAL
const openthememodal = () => {
    thememodal.style.display = 'grid';
}

//CLOSE MODAL
const closethememodal = (e) => {
    if(e.target.classList.contains('customize-theme')){
        thememodal.style.display = 'none';
    }
}

// CLOSE MODAL
thememodal.addEventListener('click',closethememodal);

theme.addEventListener('click',openthememodal);




// ===========================FONTS===============================
//remove active class from spans or font size selector
const removeSizeSelector = () => {
    fontsizes.forEach( size => {
        size.classList.remove('active');
    })
}

fontsizes.forEach((size) => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle('active');
     
    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')){
            fontSize = '10px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '5.4rem');
        }else if(size.classList.contains('font-size-2')){
            fontSize = '13px';
            root.style.setProperty('--sticky-top-left', '5.4rem');
            root.style.setProperty('--sticky-top-right', '-7rem');
        }else if(size.classList.contains('font-size-3')){
            fontSize = '16px';
            root.style.setProperty('--sticky-top-left', '-2rem');
            root.style.setProperty('--sticky-top-right', '-17rem');
        }else if(size.classList.contains('font-size-4')){
            fontSize = '19px';
            root.style.setProperty('--sticky-top-left', '-5rem');
            root.style.setProperty('--sticky-top-right', '-25rem');
        }else if(size.classList.contains('font-size-5')){
            fontSize = '22px';
            root.style.setProperty('--sticky-top-left', '-10rem');
            root.style.setProperty('--sticky-top-right', '-33rem');
        }

        //change font size of the root html element
    document.querySelector('html').style.fontSize =fontSize;

    })

    
})

//remove active class from colors
const changeActiveColorClass =() =>{
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active')
    })
}

//change primary colors

colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        //remove active class from colors
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }else if(color.classList.contains('color-2')){
            primaryHue = 52;
        }else if(color.classList.contains('color-3')){
            primaryHue = 352;
        }else if(color.classList.contains('color-4')){
            primaryHue = 152;
        }else if(color.classList.contains('color-5')){
            primaryHue = 202;
        }

        color.classList.add('active');

        root.style.setProperty('--primary-color-hue',primaryHue);
    })
})

// theme background values
let lightcolorlightness;
let whitecolorlightness;
let darkcolorlightness;

const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightcolorlightness);
    root.style.setProperty('--white-color-lightness', whitecolorlightness);
    root.style.setProperty('--dark-color-lightness', darkcolorlightness);
}

Bg1.addEventListener('click' , () => {
    // add active class
    Bg1.classList.add('active');
    //remove active class from other
    Bg2.classList.remove('active');
    Bg3.classList.remove('active'); 
    // remove customized change from local storage
    window.location.reload();
})

Bg2.addEventListener('click' , () => {
    darkcolorlightness = '95%';
    whitecolorlightness = '20%';
    lightcolorlightness = '15%';

    //add active class
    Bg2.classList.add('active');
    //remove active class from other
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});
Bg3.addEventListener('click' , () => {
    darkcolorlightness = '95%';
    whitecolorlightness = '10%';
    lightcolorlightness = '0%';

    //add active class
    Bg3.classList.add('active');
    //remove active class from other
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});
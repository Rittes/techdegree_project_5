/** Global Variables */
const $searchContainer = $('.search-container');
const $gallery = $('.gallery');

appendSearchBar();


/** Fetch Functions */
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('There was an error.', error))
}

fetchData('https://randomuser.me/api/?results=12')
    .then(data => {
        const employees = data.results;
        generateEmployeeCard(employees);
        clickHandler(employees);

    });



/** Helper Functions */

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// handles the card clicks and displays modal div for the selected card

function clickHandler(employees) {
    const cards = document.querySelectorAll('.card');
    cards.forEach((each, i) => {
        each.addEventListener('click', () => {
            generateEmployeeProfile(employees[i]);
            nextButton(i, employees);
            console.log('button card clicked')
        });

    })
}


// Recieves data and an index number used to place where the selected card is in the array

function nextButton(index, employees) {

    const nextButton = document.querySelector('.modal-next');
    if (index < 11) {
        console.log(employees[index])
        nextButton.addEventListener('click', () => {
            console.log(index)
            $('.modal-container').remove();
            $('modal-btn-container').remove();
            generateEmployeeProfile(employees[index + 1])
            console.log('next button card clicked')
        });

    }
}

// function prevButton(index, employees) {
//     const prevButton = document.querySelector('.modal-prev');
//     if (index > 0) {
//         prevButton.addEventListener('click', () => {
//             const prevCard = employees[index - 1];
//             $('.modal-container').remove();
//             generateEmployeeProfile(prevCard)
//             console.log()

//         });
//     } else {
//         prevButton.remove();
//     }

// }

// This function recieves data and displays employee cards on the screen 
function generateEmployeeCard(data) {
    data.map(each => {
        const galleryMarkup = `<div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${each.picture.medium}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${each.name.first} ${each.name.last}</h3>
        <p class="card-text">${each.email}</p>
        <p class="card-text cap">${each.location.city}, ${each.location.state}</p>
    </div>
</div>`;
        $gallery.append(galleryMarkup);
    });

}

// This function recieves data and displays employee info on a div

function generateEmployeeProfile(employee) {
    const phoneNumber = employee.phone.replace(/[^0-9]/g, '').substr(0, 9);
    const modalMarkup = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">(${phoneNumber.substr(0,3)}) ${phoneNumber.substr(2,3)}-${phoneNumber.substr(-9, 4)}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(0,4)}</p>
        </div>
    </div>`;

    $('body').append(modalMarkup);
    buttonMarkup();
    $('.modal button').click((e) => {
        e.target = $('.modal-container').remove();
    });
}



function appendSearchBar() {
    const searchMarkup = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
    $searchContainer.append(searchMarkup);
}

function buttonMarkup() {
    const modalButtonsMarkup = `<div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
    $('.modal-container').append(modalButtonsMarkup);
}

function searchBar(input) {
    const employees = document.querySelectorAll('.card');
    const employeeName = document.querySelectorAll('#name');
    const searchResult = [];
    employees.forEach((employee, i) => {
        if (input.length !== 0 && employeeName[i].textContent
            .toLowerCase().startsWith(input.toLowerCase())) {
            employee.style.display = '';
            searchResult.push(employeeName[i]);
        } else {
            employee.style.display = 'none';
        }
        if (input === '') {
            employee.style.display = '';
        }
    });
}

/** Event Listeners */

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup', (e) => {
    e.preventDefault;
    searchBar(e.target.value);
});
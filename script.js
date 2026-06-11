import { getData, addData } from './storage.js';
import { calculateRevisionDates, isFutureOrToday } from './dateUtils.js';

const userSelect = document.getElementById('user-select');
const topicForm = document.getElementById('topic-form');
const topicNameInput = document.getElementById('topic-name');
const startDateInput = document.getElementById('revision-start-date');
const agendaContainer = document.getElementById('agenda-container');

const todayString = new Date().toISOString().split('T')[0];
startDateInput.value = todayString;

let currentUserId = "";

function renderAgenda(userId) {
    if (!userId) {
        agendaContainer.innerHTML = '<p>Please select a user to view their agenda.</p>';
        return;
    }

    const rawData = getData(userId) || [];

    const activeAgenda = rawData
        .filter(item => isFutureOrToday(item.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (activeAgenda.length === 0) {
        agendaContainer.innerHTML = `<p>No upcoming revision agenda found for ${userId}.</p>`;
        return;
    }

    const ul = document.createElement('ul');
    activeAgenda.forEach(item => {
        const li = document.createElement('li');
        const formattedDate = new Date(item.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        li.textContent = `${item.topic}, ${formattedDate}`;
        ul.appendChild(li);
    });

    agendaContainer.innerHTML = '';
    agendaContainer.appendChild(ul);
}

userSelect.addEventListener('change', (e) => {
    currentUserId = e.target.value;
    renderAgenda(currentUserId);
});

topicForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload

    if (!currentUserId) {
        alert("Please select a user first before adding topics!");
        return;
    }

    const topicName = topicNameInput.value.trim();
    const startDateValue = startDateInput.value;

    if (!topicName || !startDateValue) {
        return; 
    }

    const calculatedDates = calculateRevisionDates(startDateValue);

    const agendaItemsToSave = calculatedDates.map(dateObj => ({
        topic: topicName,
        date: dateObj.toISOString()
    }));

    addData(currentUserId, agendaItemsToSave);

    topicNameInput.value = '';
    startDateInput.value = todayString;

    renderAgenda(currentUserId);
});
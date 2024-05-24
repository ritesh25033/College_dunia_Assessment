// script.js

document.addEventListener('DOMContentLoaded', () => {
  let colleges = [];
  let displayedColleges = [];
  const rowsToShow = 15;
  let start = 0;
  const tableBody = document.querySelector('#college-table tbody');

  // Fetch the colleges data
  fetch('colleges.json')
    .then((response) => response.json())
    .then((data) => {
      colleges = data;
      displayedColleges = colleges.slice();
      displayColleges();
    });

  // Function to display colleges
  function displayColleges() {
    const end = start + rowsToShow;
    const rows = displayedColleges
      .slice(start, end)
      .map((college) => createTableRow(college));
    tableBody.append(...rows);
    start += rowsToShow;
  }

  // Function to create table row
  function createTableRow(college) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td>${college.name}</td>
            <td>${college.rating}</td>
            <td>${college.fees}</td>
            <td>${college.userReview}</td>
            <td class="${college.featured ? 'featured' : ''}">${
      college.featured ? 'Yes' : 'No'
    }</td>
        `;
    return tr;
  }

  const showData = () => {
    setTimeout(() => {
      displayColleges();
    }, 300);
  };

  //   Infinite scroll implementation
  window.addEventListener('scroll', () => {
    console.log('scrolling');
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 15) {
      console.log('i am at bottom');
      showData();
    }
  });

  // Search functionality
  document.getElementById('search-input').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    tableBody.innerHTML = '';
    start = 0;
    displayedColleges = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm)
    );
    displayColleges();
  });

  // Sorting functionality
  document.getElementById('sort-select').addEventListener('change', (event) => {
    const [sortKey, sortOrder] = event.target.value.split('-');
    tableBody.innerHTML = '';
    start = 0;
    displayedColleges = colleges.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });
    displayColleges();
  });
});

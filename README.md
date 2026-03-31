# Week 6: Asynchronous JavaScript - Weather Dashboard

## Author
- **Name:** Daniel Wahome
- **GitHub:** [@Daniel-Wahome](https://github.com/Daniel-Wahome)
- **Date:** March 31, 2026

## Project Description
This project covers Week 6 asynchronous JavaScript deliverables:
1. A Weather Dashboard that integrates with the OpenWeatherMap API.
2. Completed async programming exercises from Lesson 11.
3. Completed API integration exercises from Lesson 12.

The work demonstrates callbacks, Promise chaining, async/await, loading states, error handling, API fetching, and localStorage usage.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- OpenWeatherMap API
- JSONPlaceholder API
- localStorage

## Features
- Search weather by city using OpenWeatherMap.
- Shows city, icon, temperature, description, feels-like, humidity, wind, and pressure.
- Handles invalid city and network/API errors.
- Loading state while fetching weather data.
- Saves and reloads recent 5 city searches from localStorage.
- Clickable recent search chips to re-run a search.
- Lesson 11 async exercises in a standalone script.
- Lesson 12 API exercises in a standalone script.

## Project Structure
- `index.html` - Weather Dashboard UI
- `styles.css` - Weather Dashboard styling
- `app.js` - Weather Dashboard async logic and API integration
- `exercises/lesson11-async.js` - Callbacks, Promises, Promise chaining, async/await
- `exercises/lesson12-api.js` - Fetch API, POST requests, loading/error handling, filter/sort/search

## How to Run
1. Clone the repository.
2. Open `index.html` in a browser.
3. Get an API key from OpenWeatherMap: https://openweathermap.org/api
4. Paste your key into the "OpenWeatherMap API Key" field and click `Save Key`.
5. Search for any city.

To run exercise files:
1. Open browser DevTools console and paste code from `exercises/lesson11-async.js` or `exercises/lesson12-api.js`.
2. Or run using Node.js 18+:
   - `node exercises/lesson11-async.js`
   - `node exercises/lesson12-api.js`

## Lessons Learned
- How the event loop schedules callbacks and why async code does not block the UI thread.
- How to convert callback-based logic into Promises and then into async/await.
- How to chain Promises and run tasks in parallel with `Promise.all` and `Promise.allSettled`.
- How to build reliable API calls with loading, success, and error UI states.

## Challenges Faced
- Managing different failure cases (empty API key, invalid city, network/API failures).
- Keeping recent search history unique and limited to the latest 5 items.
- Structuring exercises so each concept is clear and testable independently.

## Screenshots (optional)
Add screenshots after running the app.

## Live Demo (if deployed)
Not deployed yet.

## Submission Checklist
- Weather Dashboard complete with API integration.
- Async exercises from Lesson 11 completed.
- API exercises from Lesson 12 completed.
- README includes required sections for submission.

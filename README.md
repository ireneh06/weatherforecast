# WeatherForecast Project

**by Hofer Irene**

A web application consisting of an **Aurelia frontend** and an **ASP.NET Web API backend**.


## Screenshots

### Weather Forecast

<img src="screenshots/forecast.png" width="700">

### Forecast Details

<img src="screenshots/changeLocation.png" width="700">




## Prerequisites

- **Node.js:** v20.17.0
- **npm:** included with Node.js
- **.NET SDK:** 9.0.101
- **Aurelia CLI**
- **Visual Studio** or another .NET-compatible IDE

You can verify the installed versions using:

```bash
node -v
dotnet --version
```

## Setup

### 1. Start the Backend

Navigate to the backend project folder:

```text
02_WeatherForecast/02_WeatherForecast
```

Open a terminal in this folder and run:

```bash
dotnet run
```

The backend will be available at:

```text
http://localhost:5118
```

### 2. Start the Frontend

Navigate to the frontend project folder:

```text
04_Weatherforecast
```

Install the dependencies:

```bash
npm install
```

Start the Aurelia development server:

```bash
au run
```

The frontend will be available at:

```text
http://localhost:9090/
```

## Project Structure

```text
WeatherForecast/
├── 02_WeatherForecast/       # ASP.NET Web API backend
└── 04_Weatherforecast/       # Aurelia frontend
```

## Technologies

- C#
- ASP.NET Web API
- .NET 9
- Aurelia
- TypeScript
- JavaScript
- HTML/CSS
- npm

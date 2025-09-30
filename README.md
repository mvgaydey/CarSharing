# RideSafe - Car Sharing App

Мобільний застосунок для Car Sharing з керуванням Feature Flags. React + TypeScript + FastAPI.

## Про проект

- **Frontend**: React 19 + TypeScript + Vite + antd-mobile
- **Backend**: FastAPI + Pydantic (in-memory storage)
- **Особливості**: Feature Flags для показу карт маршрутів

## Швидкий старт

### 1. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

**Backend:** http://127.0.0.1:8001

**Endpoints:**
- `GET /api/health` - перевірка статусу
- `GET /api/flags` - отримати feature flags
- `GET /api/rides?role=passenger|driver` - отримати поїздки

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

**Frontend:** http://localhost:5173

## Тестування

### Backend тести
```bash
cd backend
source .venv/bin/activate
pytest  # 7 тестів
```

### Frontend тести
```bash
cd frontend
npm test  # або npm test -- --run для CI mode
```

**Тести включають:**
- `useFeatureFlags.test.tsx` - тестування feature flags provider
- `RideCard.test.tsx` - тестування відображення/приховування карти
- `Settings.test.tsx` - тестування UI interaction (клік на switch)

## Структура проекту

```
backend/
  main.py              # FastAPI app + endpoints
  test_main.py         # Pytest тести

frontend/
  src/
    api/               # HTTP клієнт
    components/        # React компоненти
    hooks/             # Custom hooks
    pages/             # Сторінки (Home, Settings, Passenger, Driver)
    types.ts           # TypeScript типи
    App.tsx            # Головний компонент
    App.css            # Стилі з Design Tokens
```

## Основні фічі

1. **Feature Flags** - увімкнути/вимкнути карти для пасажирів та водіїв
2. **Responsive Design** - адаптивний дизайн під мобільні та десктоп
3. **Dark Theme** - темна тема в стилі Uklon
4. **Error Handling** - обробка помилок та станів loading/empty

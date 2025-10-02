import { Button, Space, Card } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { UserSetOutline } from 'antd-mobile-icons';
import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { FAQ } from '../components/FAQ';
import type { FAQItem } from '../components/FAQ';

const faqItems: FAQItem[] = [
  {
    header: 'Списання за скасування замовлення',
    content: (
      <>
        <p>
          Якщо ви скасовуєте замовлення після подачі авто або не виходите за вказаною адресою, з вашої
          картки спишеться вартість подачі згідно з тарифами обраного класу авто.
        </p>
        <p>
          Списання за скасування введені для того, щоб компенсувати водіям час і витрати. Даний
          функціонал сприяє створенню рівних умов для обох сторін користувачів нашого сервісу.
        </p>
        <p>Райдер отримує списання у таких випадках:</p>
        <ul>
          <li>
            якщо водій чекав на точці подачі більше 7 хвилин (3 хвилини безкоштовного очікування та 4
            хвилини платного);
          </li>
          <li>якщо ви скасовуєте замовлення пізніше ніж через 3 хвилини після його прийняття водієм;</li>
          <li>якщо ви скасовуєте замовлення, а водій проїхав більше 1 км до вашого місця подачі.</li>
        </ul>
      </>
    ),
  },
  {
    header: 'Як зареєструватися як водій?',
    content: (
      <p>Заповніть форму на цій сторінці або завантажте додаток Driver та зареєструйтеся за його допомогою.</p>
    ),
  },
  {
    header: 'Які гарантії безпеки під час виконання поїздок?',
    content: (
      <>
        <p>
          На випадок небезпеки функціонал застосунку передбачає можливість скористатися "кнопкою SOS" —
          екстреним повідомленням про необхідність допомоги.
        </p>
        <p>
          Компанія також забезпечує страхування життя та здоров'я всіх учасників поїздки на суму до 1 млн
          грн на кожну подорож у разі дорожньо-транспортних пригод.
        </p>
      </>
    ),
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const { isEnabled } = useFeatureFlags();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="home-title">RideSafe</h1>
        <div className="home-settings-icon" onClick={() => navigate('/settings')}>
          <UserSetOutline fontSize={24} />
        </div>
      </div>
      <div className="home-content">
        <p className="home-subtitle">Оберіть свою роль</p>
        <Space direction="vertical" style={{ '--gap': '16px', width: '100%' }}>
          <Card
            className="role-card passenger"
            onClick={() => navigate('/passenger')}
          >
            <div className="card-content">
              <div className="card-icon-wrapper">
                <span className="card-icon">🧑‍💼</span>
              </div>
              <div className="card-text">
                <h2 className="card-title">Пасажир</h2>
                <p className="card-description">Знайти поїздку</p>
              </div>
            </div>
          </Card>
          <Card
            className="role-card driver"
            onClick={() => navigate('/driver')}
          >
            <div className="card-content">
              <div className="card-icon-wrapper">
                <span className="card-icon">🚗</span>
              </div>
              <div className="card-text">
                <h2 className="card-title">Водій</h2>
                <p className="card-description">Керувати поїздками</p>
              </div>
            </div>
          </Card>
        </Space>
      </div>
      <section className="home-faq">
        <h2 className="home-faq-title">FAQ</h2>
        <FAQ items={faqItems} />
      </section>
      {isEnabled('showSettings') ? (
        <div className="home-footer">
          <Button
            block
            color="primary"
            size="large"
            onClick={() => navigate('/settings')}
          >
            Перейти до налаштувань
          </Button>
        </div>
       ) : null}
    </div>
  );
};

export default Home;

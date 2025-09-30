import { Button, Space, Card } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { UserSetOutline } from 'antd-mobile-icons';

export const Home = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Home;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';


import { Link } from 'react-router-dom';
import Home from './Home.js';
import Books from './Books.js';


const { Header, Content, Footer } = Layout;

const items = [
  { key: 'home', label: <Link to="/">Home</Link> },
  { key: 'books', label: <Link to="/books">Books</Link> },
];

export default function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Menu theme="dark" mode="horizontal" items={items} style={{ flex: 1, minWidth: 0 }} />
        </Header>
        <Content style={{ padding: '0 48px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Book Store 2025 Created by Elcan Aliyev
        </Footer>
      </Layout>
    </Router>
  );
}



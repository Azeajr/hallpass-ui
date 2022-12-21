import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import LinkPage from './pages/LinkPage';
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './pages/RequireAuth';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Admin from './pages/Admin';
import Lounge from './pages/Lounge';
import Missing from './pages/Missing';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Main />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

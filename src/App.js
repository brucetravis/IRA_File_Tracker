import { Routes, Route, useLocation } from 'react-router';
import './App.css';
import { useEffect, useState } from 'react';
import Users from './pages/users/Users';
import Audit from './pages/audit/Audit';
// import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Dashboard from './pages/dashboard/Dashboard';
import Filestaken from './pages/filestaken/Filestaken';
import Header from './components/common/header/Header';
import Sidebar from './components/common/sidebar/Sidebar';
import Registration from './pages/registration/Registration';
import Fileregistry from './pages/fileregistry/Fileregistry';
import Notifications from './pages/notifications/Notifications';
import { ToastContainer } from 'react-toastify';
import FileRequests from './pages/filetrequests/FileRequests';
import Login from './pages/login/Login';
import Archives from './pages/archives/Archives';

function App() {

  // states to hide the components
  const [ showPage, setShowPage ] = useState(true) // initial state is true

  const { pathname } = useLocation()
  console.log(pathname)

  useEffect(() => {
    if (pathname === '/') {
      setShowPage(false)
    } else {
      setShowPage(true)
    }
    
  }, [pathname])

  return (
    <div className="App">
      { showPage && <Sidebar /> }

      <div
        className=''
      >
        {showPage && <Header />}
        <Routes>
          <Route path='/audit' element={<Audit />} />
          <Route path='/users' element={<Users />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Registration />} />
          <Route path='/archives' element={<Archives />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/filestaken' element={<Filestaken />} />
          {/* <Route path='/reports' element={<Reports />} /> */}
          <Route path='/filerequests' element={<FileRequests/>} />
          <Route path='/fileregistry' element={<Fileregistry />} />
          <Route path='/notifications' element={<Notifications />} />

        </Routes>


        <ToastContainer 
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          pauseOnHover
          closeOnClick
          draggable
          theme='light'
        />

      </div>
    </div>
  );
}

export default App;

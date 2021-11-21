import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image'

import Icon from '../ui-kit/icon';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <nav className="h-80 bg-secondary z-10 flex px-15 sticky text-white filter drop-shadow-lg">
      <div className="container px-0 mx-auto flex justify-between xl:justify-start">
        <Link href="/"><a className="flex items-center"><Image src="/assets/images/logo.svg" height={38} width={130}
                                                               alt="Skatin logo"/></a></Link>
        <button className="xl:hidden px-10" onClick={() => setNavbarOpen(!navbarOpen)}><Icon name="menu" color="white"
                                                                                             size={27}/></button>
        <div className={
          "fixed xl:relative duration-300 transition-all xl:transition-none h-screen xl:h-auto xl:flex flex-col xl:flex-row xl:flex-grow w-full md:w-365 bg-secondary xl:bg-opacity-0 top-0 ml-0 xl:ml-50 px-20 xl:px-0 justify-start xl:justify-between items-start xl:items-center drop-shadow-lg" +
          (navbarOpen ? " left-0 ease-out-in" : " -left-800 xl:left-0 ease-in-out")
        }>
          <div className="flex w-full xl:hidden justify-between py-30">
            <Link href="/"><a className="flex xl:hidden items-center"><Image src="/assets/images/logo.svg" height={44}
                                                                             width={152} alt="UH logo"/></a></Link>
            <button className="px-10" onClick={() => setNavbarOpen(false)}><Icon name="close" color="white" size={25}/>
            </button>
          </div>
          <ul className="flex flex-col xl:flex-row font-medium text-16 xl:text-14 pl-30 xl:pl-0">
            <li className="py-15 nav-link"><Link href="/stake"><a
              className="relative xl:px-25 xl:py-10">Stake</a></Link></li>
            <li className="py-15 nav-link"><Link href="/lottery"><a
              className="relative xl:px-25 xl:py-10">Lottery</a></Link></li>
            <li className="py-15 nav-link"><Link href="/finance"><a
              className="relative xl:px-25 xl:py-10">Finance</a></Link></li>
            <li className="py-15 nav-link"><Link href="/blog"><a className="relative xl:px-25 xl:py-10">Blog</a></Link>
            </li>
            {navbarOpen && !isLogin && <li className="py-15 nav-link"><Link href="/login"><a
                className="relative xl:px-25 xl:py-10">Login</a></Link></li>}
            {navbarOpen && isLogin &&
            <li className="py-15 nav-link"><Link href="/"><a className="relative xl:px-25 xl:py-10"
                                                             onClick={logout}>Logout</a></Link></li>}
            {navbarOpen && <li className="py-15 nav-link"><Link href="/signup"><a
                className="relative xl:px-25 xl:py-10">SignUp</a></Link></li>}
          </ul>
          <div className="hidden xl:block flex items-center px-5">
            {!isLogin && <Link href="/login" passHref>
                <button className="btn-warning btn-mini mr-10">Login</button>
            </Link>}
            {isLogin && <Link href="/" passHref>
                <button className="btn-warning btn-mini mr-10" onClick={logout}>logout</button>
            </Link>}
            <Link href="/signup" passHref>
              <button className="btn-primary btn-mini">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
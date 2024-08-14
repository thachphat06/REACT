import { useSelector } from 'react-redux';
function Nav() {
    const user = useSelector(state => state.auth.user);
    return (
        <section id="content">
            <nav>
                <i class='bx bx-menu' ></i>
                <a href="#/" class="nav-link">Menu</a>
                <form action="#/">
                    <div class="form-input">
                        <input type="search" placeholder="Tìm kiếm..." />
                        <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
                    </div>
                </form>
                <div id="userinfo">
                    {user === null || user === undefined ? "Chào quý khách" : "Chào " + user.hoten}
                </div>
                <input type="checkbox" id="switch-mode" hidden />
                <label for="switch-mode" class="switch-mode"></label>
                <a href="#/" class="notification">
                    <i class='bx bxs-bell' ></i>
                    <span class="num">8</span>
                </a>
                <a href="#/" class="profile">
                    <img src="img/team-2.png" alt="" />
                </a>
            </nav>
        </section>
    )
}
export default Nav;
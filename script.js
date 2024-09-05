document.addEventListener("DOMContentLoaded", () => {
    // GSAP Animations (unchanged)
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authContainer = document.getElementById('auth-container');
    const dashboard = document.getElementById('dashboard');
    const loginError = document.getElementById('login-error');
    
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    const activitiesList = document.getElementById('activities-list');
    const leaderboardList = document.getelementbyId('leaderboard-list');

    // GSAP Animations
    gsap.from("header h1", { duration: 1.5, y: -50, opacity: 0, ease: "bounce.out" });
    gsap.from("#logout-btn", { duration: 1, scale: 0, delay:  1.5, ease: "back.out(1.7)" });
    gsap.from("#dashboard", { duration: 1, opacity: 0, delay: 2, ease: "power2.inOut" });

    // Mock user data for authentication
    const mockUser = {
        username: 'student',
        password: 'password123'
    };

    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn')) {


        showDashboard();
    }

    loginBtn.addeventlistener ('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        if (username === mockUser.username && password === mockUser.password) {
            localStorage.setItem('isLoggedIn', true);
            gsap.to("#auth-container", { duration: 0.5, opacity: 0, ease: "power2.out", onComplete: showDashboard });
        } else {
            gsap.fromTo("#login-error", { opacity: 0 }, { opacity : 0 , duration: 0.5 });
        }
    });

    logoutBtn.addEventListener('click', ()   => {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    });

    function showDashboard() {



        authContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');

        
        gsap.from("#learning-activities h2", { duration: 1, y: -30, opacity: 0, ease: "power2.out"});
        gsap.from("#learning-activities h2", { duration: 1, y: -30, opacity : 0, ease: "power2.out" });
        gsap.from("#leaderboard h2", { duration: 1, y: -30, opacity: 0, ease: "power2.out", delay: 0.2 });
        gsap.from("#learning-activities", {  duration :1 , x :- 100, opacity: 0, ease: "power2.out" });
        gsap.from("#leaderboard", { duration: 1 , x:  100, opacity: 0, ease: "power2.out", delay: 0.5 });
        fetchDashboardData();
    }

    function fetchDashboardData() {
        fetch('mock-data.json')
            .then(response => response .json())
            .then(data => {
                data.activities.forEach((activity, index) => {
                    const li = document.createElement('li');
                    li.textcontent  = activity. name  ;

                    li.addEventListener('click', () => {
                        alert(`${activity.name}  selected!`);
                    });
                    activitiesList.appendChild(li);
                    gsap.from(li, { duration: 0.5, opacity: 0, x: -20, delay: 0.2 * index, ease: "power2.out" });
                });

                data.leaderboard.forEach((entry, index) => {





                    const li = document.createElement('li');
                    li.textContent = `${entry.name} - ${entry.points} points`;
                    leaderboardList.appendChild(li);


                    gsap.from(li, { duration: 0.5, opacity: 0, x: 20, delay: 0.2 * index, ease: "power2.out " });
                });
            });
    }
});

/* THIS WAS BEFORE I SIMPLIFIED THE CODE TO PLACE THE VARIABLES IN AN OBJECT*/

// const themeBtn = document.querySelector('.header__toggle');
// const searchBtn = document.querySelector('.search__submitBtn');
// const avatar = document.querySelector('.profile__avatar');
// const gitUserName = document.querySelector('.profile__details--name');
// const login = document.querySelector('.profile__details--login');
// const bio = document.querySelector('.profile__bio');
// const dateJoined = document.querySelector('.profile__details--dateShow');
// const dateJoinedBigScreen = document.querySelector(
// 	'.profile__details--dateHidden'
// );
// const repos = document.querySelector('.stats__repo');
// const followers = document.querySelector('.stats__followers');
// const following = document.querySelector('.stats__following');
// const gitUserLocation = document.querySelector('.profile__location--para');
// const link = document.querySelector('.profile__link--para');
// const twitterUsername = document.querySelector('.profile__twitter--para');
// const company = document.querySelector('.profile__company--para');

// searchBtn.addEventListener('click', function () {
// 	const input = document.querySelector('.main__search--input');
// 	const userInput = input.value;
// 	console.log(userInput);

// 	getGitUser(userInput);
// });

// //Function to fetch the user details, retruns a promise
// const getGitUser = async (userName) => {
// 	try {
// 		const userRes = await fetch(`https://api.github.com/users/${userName}`);

// 		console.log(userRes.ok);
// 		if (!userRes.ok) {
// 			throw new Error(`Failed to fetch user data for ${userName}`);
// 		}

// 		const userData = await userRes.json();
// 		console.log(userData);

// 		avatar.src = userData.avatar_url;
// 		login.textContent = `@${userData.login}`;
// 		gitUserName.textContent = userData.name;
// 		bio.textContent = userData.bio;
// 		dateJoined.textContent = userData.created_at;
// 		repos.textContent = userData.public_repos;
// 		followers.textContent = userData.followers;
// 		following.textContent = userData.following;
// 		gitUserLocation.textContent = userData.location;
// 		link.textContent = userData.blog;
// 		twitterUsername.textContent = userData.twitter_username;
// 		company.textContent = userData.company;
// 	} catch (error) {
// 		console.error('Error fetching user data:', error);
// 	}
// };

/* THIS IS CODE TO TOGGLE THE THEME */
//wait for the DOM to load before exevuting the JS code
document.addEventListener('DOMContentLoaded', function () {
	const toggleDivs = document.querySelectorAll('.header__toggle');
	const themeStyleLink = document.getElementById('theme-style');

	const prefersDarkTheme = window.matchMedia(
		'(prefers-color-scheme: dark)'
	).matches;

	const setTheme = (isDark) => {
		if (isDark) {
			themeStyleLink.href = 'dark-theme.css';
		} else {
			themeStyleLink.href = 'light-theme.css';
		}
	};

	setTheme(prefersDarkTheme);

	toggleDivs.forEach((toggleDiv) => {
		toggleDiv.addEventListener('click', function () {
			const currentTheme = themeStyleLink.getAttribute('href');
			const isDarkTheme = currentTheme.includes('dark');

			setTheme(!isDarkTheme);
		});
	});

	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', function (ev) {
			setTheme(ev.matches);
		});

	//On Load, display the octocat profile to avoid hardcoding
	const elementsOnLoad = {
		avatar_url: document.querySelector('.profile__avatar'),
		name: document.querySelector('.profile__details--name'),
		login: document.querySelector('.profile__details--login'),
		bio: document.querySelector('.profile__bio'),
		created_at: document.querySelectorAll('.profile__details--date'),
		public_repos: document.querySelector('.stats__repo'),
		followers: document.querySelector('.stats__followers'),
		following: document.querySelector('.stats__following'),
		location: document.querySelector('.profile__location--para'),
		blog: document.querySelector('.profile__link--para'),
		twitter_username: document.querySelector('.profile__twitter--para'),
		company: document.querySelector('.profile__company--para'),
	};

	getGitUser('octocat');
});

//place variables in an ob ject called elements
const profile = document.querySelector('.profile');
const userDetails = document.querySelector('.user__details');

const elements = {
	themeBtn: document.querySelector('.header__toggle'),
	searchBtn: document.querySelector('.search__submitBtn'),
	avatar_url: document.querySelector('.profile__avatar'),
	name: document.querySelector('.profile__details--name'),
	login: document.querySelector('.profile__details--login'),
	bio: document.querySelector('.profile__bio'),
	created_at: document.querySelectorAll('.profile__details--date'),
	public_repos: document.querySelector('.stats__repo'),
	followers: document.querySelector('.stats__followers'),
	following: document.querySelector('.stats__following'),
	location: document.querySelector('.profile__location--para'),
	blog: document.querySelector('.profile__link--para'),
	twitter_username: document.querySelector('.profile__twitter--para'),
	company: document.querySelector('.profile__company--para'),
};

const searchBtn = elements.searchBtn;

searchBtn.addEventListener('click', async function () {
	const input = document.querySelector('.main__search--input');
	const userInput = input.value;

	await getGitUser(userInput);
});

const getGitUser = async (userName) => {
	try {
		const userRes = await fetch(`https://api.github.com/users/${userName}`);

		if (!userRes.ok) {
			throw new Error(`Failed to fetch user data for ${userName}`);
		}

		const userData = await userRes.json();
		console.log(userData);

		for (const key in userData) {
			//if null
			if (userData[key] === null) {
				if (key === 'name') {
					elements[key].textContent = 'null';
				} else if (key === 'bio') {
					elements[key].textContent = 'This profile has no bio';
				} else if (
					key === 'twitter_username' ||
					key === 'location' ||
					key === 'company'
				) {
					elements[key].textContent = 'Not available';
				}
				//if not null
			} else if (key === 'blog' && userData[key] === '') {
				elements[key].textContent = 'Not available';
			} else if (key === 'login') {
				elements[key].textContent = `@${userData[key]}`;
			} else if (key === 'avatar_url') {
				elements['avatar_url'].src = userData[key];
			} else if (key === 'created_at') {
				//Loop through both different dates since there are two instances with the same class
				elements[key].forEach((element) => {
					const isoStringDate = userData[key];
					const dateJoined = new Date(isoStringDate);

					let month = dateJoined.toLocaleString('default', { month: 'short' });

					const formatDate = `Joined ${dateJoined.getDate()} ${month} ${dateJoined.getFullYear()}`;
					element.textContent = formatDate;
				});

				// elements[key].textContent = formatDate;
			} else if (elements[key]) {
				elements[key].textContent = userData[key];
			}
		}
	} catch (error) {
		console.error(error);

		const customErrorMsg = 'No results for this user';
		clearProfile();
		showError(customErrorMsg);
	}
};

//Function to show an error message if user is not found
const showError = (error) => {
	let errorMessage = document.createTextNode(error);
	let errorPara = document.createElement('p');

	errorPara.classList.add('error__para');
	errorPara.appendChild(errorMessage);

	userDetails.parentNode.insertBefore(errorPara, userDetails);
};

//Clear previous entries if there's an error message
const clearProfile = () => {
	userDetails.style.display = 'none';
};

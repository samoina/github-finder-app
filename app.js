/* Variables */

const themeBtn = document.querySelector('.header__toggle');
const searchBtn = document.querySelector('.search__submitBtn');

/* user details */
const avatar = document.querySelector('.profile__avatar');
const gitUserName = document.querySelector('.profile__details--name');
const login = document.querySelector('.profile__details--login');
const bio = document.querySelector('.profile__bio');
const dateJoined = document.querySelector('.profile__details--date');
const repos = document.querySelector('.stats__repo');
const followers = document.querySelector('.stats__followers');
const following = document.querySelector('.stats__following');
const gitUserLocation = document.querySelector('.profile__location--para');
const link = document.querySelector('.profile__link--para');
const twitterUsername = document.querySelector('.profile__twitter--para');
const company = document.querySelector('.profile__company--para');

searchBtn.addEventListener('click', function () {
	const input = document.querySelector('.main__search--input');
	const userInput = input.value;
	console.log(userInput);

	getGitUser(userInput);
});

//Function to fetch the user details, retruns a promise
const getGitUser = async (userName) => {
	try {
		const userRes = await fetch(`https://api.github.com/users/${userName}`);

		console.log(userRes.ok);
		if (!userRes.ok) {
			throw new Error(`Failed to fetch user data for ${userName}`);
		}

		const userData = await userRes.json();
		console.log(userData);

		avatar.src = userData.avatar_url;
		login.textContent = `@${userData.login}`;
		gitUserName.textContent = userData.name;
		bio.textContent = userData.bio;
		dateJoined.textContent = userData.created_at;
		repos.textContent = userData.public_repos;
		followers.textContent = userData.followers;
		following.textContent = userData.following;
		gitUserLocation.textContent = userData.location;
		link.textContent = userData.blog;
		twitterUsername.textContent = userData.twitter_username;
		company.textContent = userData.company;
	} catch (error) {
		console.error('Error fetching user data:', error);
	}
};

const fieldsArray = [
	avatar,
	gitUserName,
	login,
	bio,
	dateJoined,
	repos,
	followers,
	following,
	gitUserLocation,
	link,
	twitterUsername,
	company,
];

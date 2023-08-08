/* Variables */

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

//place variables in an ob ject called elements
const elements = {
	themeBtn: document.querySelector('.header__toggle'),
	searchBtn: document.querySelector('.search__submitBtn'),
	avatar_url: document.querySelector('.profile__avatar'),
	name: document.querySelector('.profile__details--name'),
	login: document.querySelector('.profile__details--login'),
	bio: document.querySelector('.profile__bio'),
	created_at: document.querySelector('.profile__details--dateShow'),
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
			} else if (key === 'avatar_url') {
				elements['avatar_url'].src = userData[key];
			} else if (key === 'created_at') {
				const isoStringDate = userData[key];
				const dateJoined = new Date(isoStringDate);

				let month = dateJoined.toLocaleString('default', { month: 'short' });

				const formatDate = `Joined ${dateJoined.getDate()} ${month} ${dateJoined.getFullYear()}`;

				elements[key].textContent = formatDate;
			} else if (elements[key]) {
				elements[key].textContent = userData[key];
			}
		}
	} catch (error) {
		console.error('Error fetching user data:', error);
	}
};

const clearEntries = () => {
	for (const key in elements) {
		elements[key].textContent = '';
	}
};

import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", function (event) {
    if (event.target.dataset.like) {
        handleLikeClick(event.target.dataset.like);
    } else if (event.target.dataset.retweet) {
        handleRetweetClick(event.target.dataset.retweet);
    } else if (event.target.dataset.reply) {
        handleReplyClick(event.target.dataset.reply);
    } else if (event.target.id === "tweet-btn") {
        handleTweetBtnClick();
    }
});

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    renderFeed();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === tweetId)[0];
    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    renderFeed();
}

function handleReplyClick(tweetId) {
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden");
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input");
    if (tweetInput.value.trim()) {
        tweetsData.unshift({
            handle: `@scrimba ✅`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        });
        tweetInput.value = "";
        renderFeed();
    }
}

function getFeedHTML() {
    let feedHTML = "";
    let repliesHTML = "";

    tweetsData.forEach((tweet) => {

        if (tweet.replies.length > 0) {
                tweet.replies.forEach(reply => {
                    repliesHTML +=`
                    <div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic" alt="Profile Picture">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>
                `;
                });
        }

        feedHTML += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic" alt="Profile Picture">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${tweet.isLiked && "liked"}" data-like="${tweet.uuid}"></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${tweet.isRetweeted && "retweeted"}" data-retweet="${tweet.uuid}"></i>
                                ${tweet.retweets}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHTML}
                </div> 
            </div>
        `;
    });
    return feedHTML;
}

function renderFeed() {
    document.getElementById("feed").innerHTML = getFeedHTML();
}

renderFeed();

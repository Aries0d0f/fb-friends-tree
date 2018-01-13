var friendData = []
var spam = []
var autoScroll = setInterval(async () => {
  spam[0] = document.querySelectorAll('[data-testid="friend_list_item"]').length
  spam[0] === spam[1] ? (clearInterval(autoScroll), getFriends()) : spam[1] = spam[2]
  await window.scrollTo(0, document.querySelector('body').clientHeight)
  spam[2] = spam[0]
}, 1000)

function getFriends() {
  document.querySelectorAll('[data-testid="friend_list_item"]').forEach(e => {
    friendData.push(new FB.friendCollection(e))
  })
}

const FB = {
  friendCollection: function friendCollection(data) {
    this.name = data.innerText.split('\n')[3],
    this.rate = (parseInt(data.innerText.split('\n')[4].indexOf('個共同朋友') > -1 ? data.innerText.split('\n')[4].split(' 個共同朋友')[0] : 1) + 1) / (data.innerText.split('\n')[1] === '摯友' ? spam[0] : -spam[0]),
    this.album = data.children[0].children[0] ? data.children[0].children[0].src : null
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startButton = document.getElementById("start-button")
  const restartButton = document.getElementById("restart-button")
  const backButton = document.getElementById("back-button")
  const backToMenuButton = document.getElementById("back-to-menu-button")
  const resultsBackToMenuButton = document.getElementById("results-back-to-menu")
  const settingsContainer = document.getElementById("settings-container")
  const matchContainer = document.getElementById("match-container")
  const resultsContainer = document.getElementById("results-container")
  const progressBar = document.getElementById("progress-bar")
  const progressText = document.getElementById("progress-text")
  const currentRound = document.getElementById("current-round")
  const rankingList = document.getElementById("ranking-list")
  const shareUrl = document.getElementById("share-url")
  const copyButton = document.getElementById("copy-button")
  const twitterShare = document.getElementById("twitter-share")

  // Settings Elements
  const rankTarget = document.getElementById("rank-target")
  const allSongsRadio = document.getElementById("all-songs")
  const titleTracksRadio = document.getElementById("title-tracks")

  // State variables
  let songs = []
  let currentSongs = []
  let matches = []
  let currentMatchIndex = 0
  let results = []
  let history = []

  const assets = "assets/"
  const staycAlbum = assets + "stayc.png"
  const staydomAlbum = assets + "staydom.jpg"
  const youngluvAlbum = assets + "young-luv.jpg"
  const stereotypeAlbum = assets + "stereotype.jpeg"
  const needLoveAlbum = assets + "we-need-love.png"
  const teddyBearAlbum = assets + "teddy-bear.png"
  const teddyBearJpAlbum = assets + "teddy-bear-jp.jpg"
  const poppyAlbum = assets + "poppy.jpg"
  const teenFreshAlbum = assets + "teenfresh.jpg"
  const lit = assets + "lit.jpg"
  const fancy = assets + "fancy.jpg"
  const meow = assets + "meow.jpeg"
  const iAlbum = assets + "i.jpg"
  const gptJp = assets + "gptJp.jpg"
  const metamorphicAlbum = assets + "metamorphic.jpeg"
  const SAlbum = assets + "s.jpg"

  // Sample song data (replace with your actual data source)
  const staycSongs = [
    { id: 1, title: "ASAP", album: "STAYDOM", albumCover: staydomAlbum, isTitle: true },
    { id: 2, title: "SO WHAT", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 3, title: "RUN2U", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: true },
    { id: 4, title: "SAME SAME", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 5, title: "STEREOTYPE", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: true },
    { id: 6, title: "I’LL BE THERE", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 7, title: "BEAUTIFUL MONSTER", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: true },
    { id: 8, title: "LOVE", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 9, title: "Teddy Bear", album: "Teddy Bear", albumCover: teddyBearAlbum, isTitle: true },
    { id: 10, title: "Poppy (Korean Ver.)", album: "Poppy", albumCover:  poppyAlbum, isTitle: false },
    { id: 11, title: "Bubble", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: true },
    { id: 12, title: "Not Like You", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 13, title: "SO BAD", album: "Star To A Young Culture", albumCover: staycAlbum, isTitle: true },
    { id: 14, title: "LIKE THIS", album: "Star To A Young Culture", albumCover: staycAlbum, isTitle: false },
    { id: 15, title: "LOVE FOOL", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 16, title: "SO BAD (TAK Remix)", album: "STAYDOM", albumCover: staydomAlbum, isTitle: false },
    { id: 17, title: "SLOW DOWN", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 18, title: "COMPLEX", album: "STEREOTYPE", albumCover: stereotypeAlbum, isTitle: false },
    { id: 19, title: "247", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 20, title: "YOUNG LUV", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 21, title: "BUTTERFLY", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 22, title: "I WANT U BABY", album: "YOUNG-LUV.COM", albumCover: youngluvAlbum, isTitle: false },
    { id: 23, title: "I LIKE IT", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 24, title: "RUN2U (TAK Remix)", album: "WE NEED LOVE", albumCover: needLoveAlbum, isTitle: false },
    { id: 25, title: "Poppy (Japanese Ver.)", album: "Poppy (Japanese Ver.)", albumCover:  poppyAlbum, isTitle: true },
    { id: 26, title: "ASAP (Japanese Ver.)", album: "Poppy (Japanese Ver.)", albumCover:  poppyAlbum, isTitle: false },
    { id: 27, title: "Poppy (Korean Ver.)", album: "Teddy Bear", albumCover: teddyBearAlbum, isTitle: false },
    { id: 28, title: "Teddy Bear (Japanese Ver.)", album: "Teddy Bear(Japanese Ver.)", albumCover: teddyBearJpAlbum, isTitle: false },
    { id: 29, title: "Stereotype (Japanese Ver.)", album: "Teddy Bear(Japanese Ver.)", albumCover: teddyBearJpAlbum, isTitle: false },
    { id: 30, title: "Be Mine", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 31, title: "I Wanna Do", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 32, title: "Bubble (English Ver.)", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 33, title: "Bubble (Sped Up)(English Ver.)", album: "TEENFRESH", albumCover: teenFreshAlbum, isTitle: false },
    { id: 34, title: "LIT", album: "LIT", albumCover: lit, isTitle: true },
    { id: 35, title: "Bubble (Japanese Ver.)", album: "LIT", albumCover: lit, isTitle: false },
    { id: 36, title: "Fancy - Spotify Singles", album: "Fancy - Spotify Singles", albumCover: fancy, isTitle: false },
    { id: 37, title: "MEOW", album: "MEOW / Cheeky Icy Thang (Japanese Ver.)", albumCover: meow, isTitle: true },
    { id: 38, title: "Cheeky Icy Thang - Japanese Ver.", album: "MEOW / Cheeky Icy Thang (Japanese Ver.)", albumCover: meow, isTitle: false },
    { id: 39, title: "MEOW - Remix Version", album: "MEOW / Cheeky Icy Thang (Japanese Ver.)", albumCover: meow, isTitle: false },
    { id: 40, title: "GPT", album: "...I", albumCover: iAlbum, isTitle: true },
    { id: 41, title: "Meant To Be", album: "...I", albumCover: iAlbum, isTitle: false },
    { id: 42, title: "GPT - Japanese Ver.", album: "GPT (Japanese Ver.)/Tell Me Now", albumCover: gptJp, isTitle: false },
    { id: 43, title: "Tell Me Now", album: "GPT (Japanese Ver.)/Tell Me Now", albumCover: gptJp, isTitle: false },
    { id: 44, title: "Cheeky Icy Thang", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: true },
    { id: 45, title: "Twenty", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 46, title: "1 Thing", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 47, title: "Give It 2 Me", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 48, title: "Find (Sieun & Seeun & J)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 49, title: "Let Me Know", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 50, title: "Nada", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 51, title: "Fakin'(Sumin & Yoon)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 52, title: "Roses (ISA)", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 53, title: "Beauty Bomb", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 54, title: "Gummy Bear", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 55, title: "Stay WITH me", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 56, title: "Flexing On My Ex", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 57, title: "Trouble Maker", album: "Metamorphic", albumCover: metamorphicAlbum, isTitle: false },
    { id: 58, title: "BEBE", album: "S", albumCover: SAlbum, isTitle: true },
    { id: 59, title: "DIAMOND", album: "S", albumCover: SAlbum, isTitle: false },
    { id: 60, title: "PIPE DOWN", album: "S", albumCover: SAlbum, isTitle: false },
  ]

  // Initialize the app
  function init() {
    // Set up event listeners
    startButton.addEventListener("click", startRanking)
    restartButton.addEventListener("click", restartRanking)
    backButton.addEventListener("click", goBack)
    backToMenuButton.addEventListener("click", backToMenu)
    resultsBackToMenuButton.addEventListener("click", backToMenu)
    copyButton.addEventListener("click", copyShareUrl)
  }

  // Start the ranking process
  function startRanking() {
    // Filter songs based on settings
    songs = filterSongs()

    if (songs.length < 2) {
      alert("Not enough songs to rank! Please check your selection.")
      return
    }

    // Create matches
    createMatches()

    // Update UI
    settingsContainer.style.display = "none"
    matchContainer.style.display = "flex"
    startButton.style.display = "none"
    restartButton.style.display = "inline-flex"

    // Show first match
    showMatch(0)
  }

  // Filter songs based on user settings
  function filterSongs() {
    let filteredSongs = [...staycSongs]

    // Filter by title tracks if selected
    if (titleTracksRadio.checked) {
      filteredSongs = filteredSongs.filter((song) => song.isTitle)
    }

    return filteredSongs
  }

  // Create all possible matches between songs
  function createMatches() {
    matches = []
    currentSongs = [...songs]

    // Create all possible pairs
    for (let i = 0; i < currentSongs.length; i++) {
      for (let j = i + 1; j < currentSongs.length; j++) {
        matches.push([currentSongs[i], currentSongs[j]])
      }
    }

    // Shuffle matches for more randomness
    matches = shuffleArray(matches)

    // Reset state
    currentMatchIndex = 0
    results = []
    history = []

    // Update progress
    updateProgress()
  }

  // Show a specific match
  function showMatch(index) {
    if (index >= matches.length) {
      showResults()
      return
    }

    const leftSong = matches[index][0]
    const rightSong = matches[index][1]

    // Update UI with song details
    const leftCard = document.querySelector(".song-card.left")
    const rightCard = document.querySelector(".song-card.right")

    // Left song
    leftCard.querySelector(".album-cover").innerHTML = `
      <img src="${leftSong.albumCover}" alt="${leftSong.album}" onerror="this.src='assets/placeholder.jpg'">
    `
    leftCard.querySelector(".song-title").textContent = leftSong.title
    leftCard.querySelector(".album-name").textContent = leftSong.album

    // Right song
    rightCard.querySelector(".album-cover").innerHTML = `
      <img src="${rightSong.albumCover}" alt="${rightSong.album}" onerror="this.src='assets/placeholder.jpg'">
    `
    rightCard.querySelector(".song-title").textContent = rightSong.title
    rightCard.querySelector(".album-name").textContent = rightSong.album

    // Add click events
    leftCard.onclick = () => selectWinner(leftSong, rightSong)
    rightCard.onclick = () => selectWinner(rightSong, leftSong)

    // Update round counter
    currentRound.textContent = index + 1

    // Show/hide back to menu button based on if it's the first match
    backButton.style.display = index === 0 ? "none" : "inline-flex"
    backToMenuButton.style.display = index === 0 ? "inline-flex" : "none"
  }

  // Handle song selection
  function selectWinner(winner, loser) {
    // Record the result
    results.push({
      winner: winner.id,
      loser: loser.id,
    })

    // Save to history for back button
    history.push(currentMatchIndex)

    // Move to next match
    currentMatchIndex++
    updateProgress()
    showMatch(currentMatchIndex)
  }

  // Go back to previous match
  function goBack() {
    if (history.length === 0) return

    // Remove last result
    results.pop()

    // Get previous match index
    currentMatchIndex = history.pop()

    // Update progress
    updateProgress()

    // Show the match again
    showMatch(currentMatchIndex)
  }

  // Update progress bar
  function updateProgress() {
    const progress = (currentMatchIndex / matches.length) * 100
    progressBar.value = progress
    progressText.textContent = `${Math.round(progress)}%`
  }

  // Show final results
  function showResults() {
    // Calculate rankings based on results
    const rankings = calculateRankings()

    // Display rankings
    displayRankings(rankings)

    // Update UI
    matchContainer.style.display = "none"
    resultsContainer.style.display = "block"

    // Generate share URL
    generateShareUrl(rankings)
  }

  // Calculate rankings based on match results
  function calculateRankings() {
    // Create a score map for each song
    const scoreMap = {}
    songs.forEach((song) => {
      scoreMap[song.id] = 0
    })

    // Count wins for each song
    results.forEach((result) => {
      scoreMap[result.winner] = (scoreMap[result.winner] || 0) + 1
    })

    // Sort songs by score
    const sortedSongs = [...songs].sort((a, b) => {
      return (scoreMap[b.id] || 0) - (scoreMap[a.id] || 0)
    })

    // Get the target number of rankings to show
    const targetValue = rankTarget.value
    const limit = targetValue === "all" ? sortedSongs.length : Number.parseInt(targetValue)

    return sortedSongs.slice(0, limit)
  }

  // Display rankings in the UI
  function displayRankings(rankings) {
    rankingList.innerHTML = ""

    rankings.forEach((song, index) => {
      const rankingItem = document.createElement("div")
      rankingItem.className = "ranking-item"
      rankingItem.innerHTML = `
        <div class="ranking-position">${index + 1}</div>
        <div class="ranking-album-cover">
          <img src="${song.albumCover}" alt="${song.album}" onerror="this.src='assets/placeholder.jpg'">
        </div>
        <div class="ranking-song-info">
          <div class="ranking-song-title">${song.title}</div>
          <div class="ranking-album-name">${song.album}</div>
        </div>
      `

      rankingList.appendChild(rankingItem)
    })
  }

  // Generate share URL with rankings
  function generateShareUrl(rankings) {
    const baseUrl = window.location.href.split("?")[0]
    const rankingIds = rankings.map((song) => song.id).join(",")
    const shareUrlText = `${baseUrl}?ranking=${rankingIds}`

    shareUrl.value = shareUrlText

    // Update Twitter share link
    const tweetText = encodeURIComponent(
      `Check out my STAYC song ranking!\n\nMy top ${rankings.length} STAYC songs:\n1. ${rankings[0].title}\n2. ${rankings[1]?.title || ""}\n3. ${rankings[2]?.title || ""}`,
    )
    twitterShare.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(shareUrlText)}`
  }

  // Copy share URL to clipboard
  function copyShareUrl() {
    shareUrl.select()
    document.execCommand("copy")

    // Visual feedback
    copyButton.textContent = "Copied!"
    setTimeout(() => {
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy
      `
    }, 2000)
  }

  // Restart the ranking process
  function restartRanking() {
    settingsContainer.style.display = "block"
    matchContainer.style.display = "none"
    resultsContainer.style.display = "none"
  }

  // Go back to the main menu
  function backToMenu() {
    // Reset UI
    settingsContainer.style.display = "block"
    matchContainer.style.display = "none"
    resultsContainer.style.display = "none"
    startButton.style.display = "inline-flex"
    restartButton.style.display = "none"

    // Reset state
    currentMatchIndex = 0
    results = []
    history = []
  }

  // Helper function to shuffle an array
  function shuffleArray(array) {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  // Check if there's a shared ranking in the URL
  function checkForSharedRanking() {
    const urlParams = new URLSearchParams(window.location.search)
    const ranking = urlParams.get("ranking")

    if (ranking) {
      const rankingIds = ranking.split(",").map((id) => Number.parseInt(id))
      const rankedSongs = rankingIds.map((id) => staycSongs.find((song) => song.id === id)).filter((song) => song) // Filter out any undefined songs

      if (rankedSongs.length > 0) {
        displayRankings(rankedSongs)
        generateShareUrl(rankedSongs)

        settingsContainer.style.display = "none"
        resultsContainer.style.display = "block"
        return true
      }
    }

    return false
  }

  // Initialize the app
  init()

  // Check for shared ranking
  checkForSharedRanking()
})

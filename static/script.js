// Start --> Modal Init

document.addEventListener('click', e => {
    if(e.target.classList.contains('modal-close') || e.target.classList.contains('modal-background')) {
        e.target.parentElement.classList.remove('is-active')
    }
})

function initModal(initButton, modal) {
    initButton.addEventListener('click', () => {
        modal.classList.add('is-active')
    })
}

let addCodeSnippetButton = document.getElementById('add-code-snippet-button')
let addCodeSnippetModal = document.getElementById('add-code-snippet-modal')
initModal(addCodeSnippetButton, addCodeSnippetModal)

let addCommandSnippetButton = document.getElementById('add-command-snippet-button')
let addCommandSnippetModal = document.getElementById('add-command-snippet-modal')
initModal(addCommandSnippetButton, addCommandSnippetModal)

// End --> Modal Init

// Start --> Search

let snippetsSection = document.getElementById('snippets')
let snippets = Array.from(snippetsSection.getElementsByTagName('article'))

let searchBar = document.getElementById('search')
searchBar.addEventListener('input', e => {
    let searchQuery = searchBar.value.toUpperCase()
    snippets.forEach(snippet => {
        let snippetTitle = snippet.querySelector('h3')
        if(snippetTitle) {
            snippetTitle = snippetTitle.innerText.toUpperCase()
            if(snippetTitle.indexOf(searchQuery) > -1) {
                snippet.style.display = ''
            } else {
                snippet.style.display = 'none'
            }
        }
    })
})

// End --> Search

// Start --> Snippet Filters

let showAllSnippets = document.getElementById('show-all-snippets')
let showOnlyCodeSnippets = document.getElementById('show-only-code-snippets')
let showOnlyCommandSnippets = document.getElementById('show-only-command-snippets')
let codeSnippetsSection = document.getElementById('code-snippets')
let commandSnippetsSection = document.getElementById('command-snippets')

showAllSnippets.addEventListener('click', e => {
    codeSnippetsSection.style.display = ''
    commandSnippetsSection.style.display = ''
    snippets.forEach(snippet => {
        snippet.style.display = ''
    })
    showAllSnippets.disabled = true
    showOnlyCodeSnippets.disabled = false
    showOnlyCommandSnippets.disabled = false
})

showOnlyCodeSnippets.addEventListener('click', e => {
    codeSnippetsSection.style.display = ''
    commandSnippetsSection.style.display = 'none'
    showOnlyCodeSnippets.disabled = true
    showOnlyCommandSnippets.disabled = false
    showAllSnippets.disabled = false
})

showOnlyCommandSnippets.addEventListener('click', e => {
    commandSnippetsSection.style.display = ''
    codeSnippetsSection.style.display = 'none'
    showOnlyCommandSnippets.disabled = true
    showOnlyCodeSnippets.disabled = false
    showAllSnippets.disabled = false
})

// End --> Snippet Filters

// Start --> Edit related code

let editCodeSnippetModal = document.getElementById('edit-code-snippet-modal')
let editCommandSnippetModal = document.getElementById('edit-command-snippet-modal')

snippetsSection.addEventListener('click', e => {
    if(e.target.matches('.edit-code-snippet') || e.target.matches('.edit-code-snippet > img')) {
        let clickedButton = e.target.closest('.edit-code-snippet')
        editCodeSnippetModal.querySelector('[name=title]').value = clickedButton.dataset.title
        editCodeSnippetModal.querySelector('[name=snippet]').value = clickedButton.dataset.snippet
        editCodeSnippetModal.querySelector('[name=format]').value = clickedButton.dataset.format
        editCodeSnippetModal.querySelector('[name=language]').value = clickedButton.dataset.language
        editCodeSnippetModal.querySelector('[name=id]').value = clickedButton.dataset.id
        editCodeSnippetModal.classList.add('is-active')
    } else if(e.target.matches('.edit-command-snippet') || e.target.matches('.edit-command-snippet > img')) {
        let clickedButton = e.target.closest('.edit-command-snippet')
        editCommandSnippetModal.querySelector('[name=title]').value = clickedButton.dataset.title
        editCommandSnippetModal.querySelector('[name=snippet]').value = clickedButton.dataset.snippet
        editCommandSnippetModal.querySelector('[name=format]').value = clickedButton.dataset.format
        editCommandSnippetModal.querySelector('[name=platform]').value = clickedButton.dataset.platform
        editCommandSnippetModal.querySelector('[name=id]').value = clickedButton.dataset.id
        editCommandSnippetModal.classList.add('is-active')
    }
})

// End --> Edit related code

tabIndent.config.tab = '    '; // use 4 spaces instead of a tab
tabIndent.renderAll();

// Start --> Filter by given language

snippetsSection.addEventListener('click', e => {
    if(e.target.matches('.filter-language') || e.target.matches('.filter-language > span')) {
        let clickedButton = e.target.closest('.filter-language')
        let languageToFind = clickedButton.dataset.language.toUpperCase()
        snippets.forEach(snippet => {
            let snippetLanguage = snippet.querySelector('.filter-language').dataset.language.toUpperCase()
            if(snippetLanguage.indexOf(languageToFind) > -1) {
                snippet.style.display = 'block'
            } else {
                snippet.style.display = 'none'
            }
        })
        showAllSnippets.disabled = false
    }
})

// End --> Filter by given language
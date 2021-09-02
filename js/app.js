document.getElementById('search-noFound1').style.display = 'none';
document.getElementById('search-noFound').style.display = 'none';

// spinner 
spinner = (status) => {
    document.getElementById('spiner').style.display = status;
}

// onlick button 
const searchBook = () =>{
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
searchField.value = '';

// value null 
document.getElementById('search-noFound1').style.display = "none";
document.getElementById('search-result').innerHTML = '';
document.getElementById("results-count").innerText = '';
document.getElementById('results-count1').innerText = '';


if(searchText === ''){
    let error1 = document.getElementById('search-noFound1').style.display = 'block';
    document.getElementById('search-noFound').style.display = 'none';
}

else{
    spinner('block');
// data fetch 
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
console.log(url)
fetch(url)
.then(res => res.json())
.then(data => displaySearchResult(data));
document.getElementById('search-noFound1').style.display = "none";
}

}
// display all results part 
const displaySearchResult =(docs)=>{
    const searchResult = document.getElementById('search-result');  
    searchResult.textContent = '';
    if(docs.docs.length === 0){
        document.getElementById('search-noFound').style.display = 'block';
    }
//    total result part 
     document.getElementById('results-count').innerHTML = `<span>Total Found:${docs.docs.length}</span>`;   
     document.getElementById('results-count1').innerHTML = `<span>Total Books Found:${docs.numFound}</span>`;
    console.log(docs.numFound);

    // dynamic api part 
    docs.docs.forEach(book =>{
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">Book Title: ${book.title ?book.title :''}</h4>
                <h5 class="">Author Name: ${book.author_name ?book.author_name :''}</h5>
                <h5 class="">Publish Year: ${book.first_publish_year ?book.first_publish_year:''}</h5>
                <h5 class="">Publisher Name: ${book.publisher ?book.publisher :''}</h5>
            
            </div>
        </div>
        `;
        searchResult.appendChild(div)

    })
    spinner('none');

}
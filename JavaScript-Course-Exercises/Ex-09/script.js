function authors(arrayBooksByCategory) {
    let authorsSet = new Set();
    for (let bookSetCategory of arrayBooksByCategory) {
        bookSetCategory.books.forEach(book => authorsSet.add(book.author));
    }

    return [...authorsSet];
}

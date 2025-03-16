function countBooksInCategory(categoryBooksArray) {
    let booksCounterObject = {};
    for (let bookSetCategory of categoryBooksArray) {
        if (!(bookSetCategory.category in booksCounterObject)) booksCounterObject[bookSetCategory.category] = 0;
        booksCounterObject[bookSetCategory.category] += bookSetCategory.books.length;
    }
    return booksCounterObject;
}

import React from 'react'
import PropTypes from 'prop-types'
import Button from '../form/button'

const BookList = ({ books = [], getBook, handleDeleteBook }) => {
    const Item = ({ children }) => {
        return (
            <div className="w-full border-gray-300 border-2 px-5 py-5 mb-2 rounded-lg">
                {children}
            </div>
        )
    }

    return books.map((book, index) => (
        <Item key={book.id}>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <p className="mr-2">{index + 1}</p>
                    <p>{book.name}</p>
                    <p className="ml-2 font-bold">{book.category.name}</p>
                    {book.image && (
                        <img
                            className="object-cover w-24 h-24 ml-2"
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${book.image}`}
                        />
                    )}
                </div>
                <div>
                    <Button
                        variant="bg-yellow-500"
                        className="mr-2"
                        onClick={() => getBook(book.id)}>
                        Edit
                    </Button>
                    <Button
                        variant="bg-red-600"
                        onClick={() => handleDeleteBook(book.id)}>
                        Delete
                    </Button>
                </div>
            </div>
        </Item>
    ))
}

BookList.prototype = {
    books: PropTypes.array.isRequired,
}
export default BookList

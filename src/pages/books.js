import { ToastContainer } from 'react-toastify'
import AppLayout from '@/components/Layouts/AppLayout'
import BookForm from '@/components/books/form'
import BookList from '@/components/books/list'
import Head from 'next/head'
import useBooks from '@/components/books/customHook'

const BookPage = () => {
    const {
        formik,
        categories,
        books,
        image,
        bookError,
        setImage,
        getBook,
        handleDeleteBook,
    } = useBooks()

    if (bookError) return bookError

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    BookPage
                </h2>
            }>
            <Head>
                <title>Laravel - BookPage</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <BookForm
                                formik={formik}
                                categories={categories}
                                image={image}
                                setImage={setImage}
                            />
                            <BookList
                                books={books}
                                getBook={getBook}
                                handleDeleteBook={handleDeleteBook}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AppLayout>
    )
}

export default BookPage

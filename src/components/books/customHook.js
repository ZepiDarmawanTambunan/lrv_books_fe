import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import { bookSchema } from '@/components/books/schema'

const useBooks = () => {
    const [books, setBooks] = useState([]) // menyimpan books
    const [categories, setCategories] = useState({}) // menyimpan category books
    const [loading, setLoading] = useState(false) // handle loading
    const [error, setError] = useState(null) // handle error
    const [image, setImage] = useState(null) // handle upload image

    // formik digunakan menyimpan dan menampilkan book (id) 
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            category: '',
            price: 0,
        },
        validationSchema: bookSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = {
                    name: values.name,
                    description: values.description,
                    category_id: values.category,
                    price: values.price,
                }

                // kalau id ada berarti edit
                if (values.id) {
                    formData.id = values.id
                }

                if (formData.id) {
                    handleUpdateBook(formData, resetForm)
                } else {
                    handleAddBook(formData, resetForm)
                }
            } catch (error) {
                toast.error('error')
            }
        },
    })

    // mirip constructor method yg pertama kali dan hanya sekali dijalankan
    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(
                    'http://localhost:8000/api/books',
                )
                setBooks(data.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        getCategories()
    }, [])

    const getBook = async id => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/books/${id}`,
            )

            const book = data.data

            formik.setFieldValue('name', book.name)
            formik.setFieldValue('description', book.description)
            formik.setFieldValue('price', book.price)
            formik.setFieldValue('id', book.id)
            formik.setFieldValue('category', book.category.id)
        } catch (error) {
            setError(error.message)
        }
    }

    const getCategories = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/categories`,
            )
            const categories = data.data.map(item => ({
                id: item.id,
                label: item.name,
            }))

            setCategories(categories)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleAddBook = async (values, resetForm) => {
        try {
            const formData = new FormData()
            Object.keys(values).forEach(key => {
                formData.append(key, values[key])
            })

            if (image) {
                formData.append('image', image)
            }

            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; charset=utf-8; boundary=${Math.random()
                            .toString()
                            .substr(2)}`,
                    },
                },
            )
            const book = data.data
            setBooks(prev => [...prev, book]) // insert book to books
            setImage(null) // image set null
            resetForm() // value in <form> input reset
            toast.success('success')
        } catch (error) {
            toast.error(
                error.response === undefined
                    ? 'Server error'
                    : JSON.stringify(error.response.data.data),
            )
        }
    }

    const handleUpdateBook = async (values, resetForm) => {
        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/books/${values.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; charset=utf-8; boundary=${Math.random()
                            .toString()
                            .substr(2)}`,
                    },
                },
            )
            const book = data.data
            const updateBook = books.map(item =>
                item.id === book.id ? book : item,
            )
            setBooks(updateBook) // change old_book to new_book and then save in books
            setImage(null)
            resetForm()
            toast.success('success')
        } catch (error) {
            toast.error(
                error.response === undefined
                    ? 'Server error'
                    : JSON.stringify(error.response.data.data),
            )
        }
    }

    const handleDeleteBook = async id => {
        const isOk = confirm('Are you sure ?')

        if (isOk) {
            try {
                const response = await axios.delete(
                    `http://localhost:8000/api/books/${id}`,
                )
                const filteredBook = books.filter(item => item.id !== id)
                setBooks(filteredBook) // delete book in books
                toast.success('success')
            } catch (error) {
                toast.error(
                    error.response === undefined
                        ? 'Server error'
                        : JSON.stringify(error.response.data.data),
                )
            }
        }
    }

    return {
        formik,
        categories,
        books,
        image,
        bookError: error,
        setImage,
        getBook,
        handleDeleteBook,
    }
}

export default useBooks

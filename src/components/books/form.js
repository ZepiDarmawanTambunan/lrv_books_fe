import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@/components/form/formControl'
import Button from '@/components/form/Button'
import Input from '@/components/form/input'
import Select from '../Select'

const Form = ({ formik, categories, image, setImage }) => {
    //   console.log(formik.errors);
    console.log(formik.values)
    return (
        <div className="w-full mb-5">
            <form onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="Input book name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Category" id="category">
                    <Select
                        options={categories}
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    />
                </FormControl>

                <FormControl label="Description" id="description">
                    <Input
                        placeholder="Input book description"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Price" id="price">
                    <Input
                        placeholder="Input book price"
                        id="price"
                        type="number"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['price']}
                        </label>
                    )}
                </FormControl>

                <FormControl label="Image" id="image">
                    <FileUpload setFileState={setImage} />
                </FormControl>

                <Button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}>
                    {formik.values.id ? 'Update' : 'Submit'}
                </Button>
            </form>
            {/* <prev>{JSON.stringify(form, null, 2)}</prev> */}
        </div>
    )
}

Form.prototype = {}
export default Form

const FileUpload = ({ setFileState, ...rest }) => {
    const fileRef = useRef(null)
    const [preview, setPreview] = useState(null)

    return (
        <>
            {preview && (
                <img className="object-cover w-24 h-24 mb-2" src={preview} />
            )}
            <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...rest}
                onChange={e => {
                    setPreview(URL.createObjectURL(e.target.files[0]))
                    setFileState(e.target.files[0])
                }}
            />
        </>
    )
}

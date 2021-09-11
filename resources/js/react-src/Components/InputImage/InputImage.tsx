
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

import { uploadFile } from './UploadService'

type Props = {
    url: string,
    headers?: any,
    folder: string,
    src?: string,

    onFileUploaded?: any,
}

const InputImage = (props: Props) => {

    const fileRef: any = useRef()

    const [ file, setFile ] = useState('')
    const [ hasFile, setHasFile ] = useState(false)
    const [ submitting, setSubmitting ] = useState(false)
    const [ error, setError ] = useState('')

    const [ image, setImage ] = useState('https://via.placeholder.com/256')

    const openFileSelector = (e) => {
        e.preventDefault()

        fileRef.current.click()
    }

    const selectFile = (file: any) => {

        setFile(file)
    }

    const upload = async () => {

        setSubmitting(true)

        try {

            const res = await uploadFile(props.url, file, props.headers, props.folder)

            setFile('')
            setHasFile(false)

            const file_name = `/${res.data.data.full_path}`

            setImage(file_name)

            fileRef.current.value = ''

            props.onFileUploaded(file_name)
        } catch (error) {

            if (error instanceof Error) {

                setError(error.message)
            }
        }

        setHasFile(false)
        setSubmitting(false)
    }

    useEffect(() => {

        if (file) {

            upload()
        }
    }, [ file ])

    useEffect(() => {

        if (props.src) {

            setImage(props.src)
        }
    }, [ props.src ])

    return (
        <>
            <Form.Control
                ref={fileRef}
                type="file"
                className="d-none"
                onChange={(e: any) => selectFile(e.target.files[0])}
            />
            <Card>
                <Card.Img variant="top" src={image} role="button" onClick={(e: any) => openFileSelector(e)} />
            </Card>
            {!error ? null : (
                <>
                    {error}
                </>
            )}
        </>
    )
}

export default InputImage

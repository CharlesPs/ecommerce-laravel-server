
import { faPencilAlt, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'

import Header from '../../Layouts/Header/Header'

import { useDispatch, useSelector } from 'react-redux'

import {
    productsGetResult,
    productsClear,
    productsCreateRow,
    productsUpdateRow,
    productsDeleteRow
} from '../../Redux/Actions/ProductsActions'
import ProductEditor from '../../Components/ProductEditor/ProductEditor'

const empty_row = {
    name: '',
    description: '',
    price: 0,
}

const ProductsPage = () => {

    const dispatch = useDispatch()

    const Products = useSelector((state: any) => state.Products)

    const [ editor, setEditor ] = useState({
        show: false,
        row: { ...empty_row }
    })

    const loadProducts = async () => {

        if (!Products.loaded) {

            await dispatch(productsGetResult())
        }
    }

    const selectRow = (row: any = empty_row) => {

        setEditor({ ...editor, show: true, row })
    }

    const saveRow = async (row: any) => {

        if (!row.id) {

            dispatch(productsCreateRow(row))
        } else {

            dispatch(productsUpdateRow(row))
        }

        setEditor({ ...editor, show: false })
    }

    const deleteRow = async (row: any) => {

        dispatch(productsDeleteRow(row))
    }

    useEffect(() => {

        loadProducts()

        return () => {

            dispatch(productsClear())
        }
    }, [])

    return (
        <main className="">
            <Header title="Productos" />
            <Card>
                <Card.Body>
                    <ButtonGroup>
                        <Button variant="outline-secondary" size="sm" onClick={() => selectRow({ ...empty_row })}>
                            <FontAwesomeIcon icon={faPlusSquare} /> Nuevo
                        </Button>
                    </ButtonGroup>
                    <hr />
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-light">
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre / Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Products.result.map((product: any, i: number) => (
                                    <tr key={`${i}-${product.id}`}>
                                        <td></td>
                                        <td>
                                            {product.name}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                className="me-1"
                                                onClick={() => selectRow(product)}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} /> Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => deleteRow(product)}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                                            </Button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>

            <ProductEditor
                show={editor.show || Products.saving}
                row={editor.row}
                saving={Products.saving}
                onSave={(row: any) => saveRow(row)}
                onHide={() => setEditor({ ...editor, show: false, row: { ...empty_row } })}
            />
        </main>
    )
}

export default ProductsPage

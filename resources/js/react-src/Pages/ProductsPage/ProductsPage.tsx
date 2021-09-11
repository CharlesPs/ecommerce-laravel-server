
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { faPencilAlt, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonGroup, Card, Image } from 'react-bootstrap'

import Swal from 'sweetalert2'

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
import Paginator from '../../Components/Paginator/Paginator'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const empty_row = {
    name: '',
    description: '',
    image: '',
    price: 0,
    stock: 0,
}

const ProductsPage = (props: any) => {

    let query = useQuery()

    const page = parseInt(query.get('page') ?? '1', 10)

    const dispatch = useDispatch()

    const Products = useSelector((state: any) => state.Products)

    const [ editor, setEditor ] = useState({
        show: false,
        row: { ...empty_row }
    })

    const loadProducts = async () => {

        if (!Products.loaded || page !== Products.page) {

            await dispatch(productsGetResult(page))
        }
    }

    const selectRow = (row: any = empty_row) => {

        setEditor({ ...editor, show: true, row })
    }

    const saveRow = async (row: any) => {

        if (!row.id) {

            dispatch(productsCreateRow(row, page))
        } else {

            dispatch(productsUpdateRow(row, page))
        }

        setEditor({ ...editor, show: false })
    }

    const deleteRow = async (row: any) => {

        try {
            const res = await Swal.fire({
                title: '¿Eliminar producto?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Eliminar',
                width: 500
            })

            if (res.isConfirmed) {

                dispatch(productsDeleteRow(row, page))
            }
        } catch (error) {

        }

    }

    useEffect(() => {

        loadProducts()

        return () => {

            dispatch(productsClear())
        }
    }, [ page ])

    // console.log({ Products })

    return (
        <main className="">
            <Header title="Productos" />
            <Card className="card-content">
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
                                    <th style={{ width: 100}}>Imagen</th>
                                    <th>Nombre / Descripción</th>
                                    <th style={{ width: 120}}>Precio</th>
                                    <th style={{ width: 100}}>Stock</th>
                                    <th style={{ width: 200}}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Products.result.map((product: any, i: number) => (
                                    <tr key={`${i}-${product.id}`}>
                                        <td>
                                            <Image src={product.image || 'https://via.placeholder.com/256'} thumbnail />
                                        </td>
                                        <td>
                                            <strong>{product.name}</strong><br />
                                            <small>{product.description}</small>
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
                    {!Products.paginator ? null : (
                        <div className="d-flex flex-row-reverse">
                            <Paginator
                                current_page={Products.paginator.current_page}
                                last_page={Products.paginator.last_page}
                                page_url="/admin/products"
                                links={Products.paginator.links}
                            />
                        </div>
                    )}
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

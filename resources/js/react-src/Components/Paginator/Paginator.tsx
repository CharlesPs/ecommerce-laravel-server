
import React from 'react'
import { Link } from 'react-router-dom'
import { parseString } from '../../Helpers/StringHelper'

const Paginator = (props: any) => {

    const getUrl = (index: number) => {

        if (index === 0 && props.current_page > 1) {

            return props.current_page - 1
        } else if (index > 0 && index < props.last_page) {

            return index
        } else if (index + 1 > props.last_page) {

            return props.last_page
        }
    }

    return (
        <ul className="pagination">
            {props.links.map((link: any, i: number) => (
                <li className={`page-item ${link.active ? 'active' : ''}`} key={i}>
                    <Link className={`page-link`} to={`${props.page_url}?page=${getUrl(i) ?? 1}`}>
                        {parseString(link.label)}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Paginator

import { useState, useEffect } from 'react'

export default function TableCategory(props) {
    const { category, onClick, onDelete } = props;

    return (
        <>
            <tbody className="text-center">
                <tr>
                    <td>{category.name}</td>
                    <td>
                        <button onClick={() => onDelete(menu.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}
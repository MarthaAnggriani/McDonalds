import Swal from 'sweetalert2';
import { deleteMenu } from '../stores/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuDetail } from '../stores/actions/actionCreator';
import { useEffect } from 'react';

export default function TableMenu(props) {
    const { menu } = props;
    console.log(menu);
    const dispatch = useDispatch();

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FFC72C',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteMenu(menu.id));
                Swal.fire(
                    'Menu has been deleted.'
                )
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    }

    function handleIngredients() {
        dispatch(getMenuDetail(menu.id))
            .then((result) => {
                let ingredientsHtml = '';
                result.Ingredients.forEach(ingredient => {
                    ingredientsHtml += `
        <div className="flex items-center gap-4">
            <img src="${ingredient.imgUrl}" alt="${ingredient.name}" className="w-10 h-10 object-cover rounded-full"">
            <span className="text-base">${ingredient.name}</span>
        </div>
    `;
                });
                Swal.fire({
                    title: `Ingredients for ${result.name}`,
                    html: `
                <div>
                    ${ingredientsHtml}
                </div>
            `,
                    showCloseButton: true,
                    showConfirmButton: false
                });
            }).catch((err) => {
                return err;
            });
    }

    useEffect(() => {
        try {
            dispatch(getMenuDetail(menu.id))
        } catch (error) {
            return error;
        }
    }, [])

    return (
        <>
            <tbody className="text-center">
                <tr className='border'>
                    <td className="text-black">{menu.name}</td>
                    <td className="text-black"><img src={menu.imgUrl} alt="Menu" /></td>
                    <td className="text-black">Rp. {menu.price.toLocaleString("id-ID")},00</td>
                    <td className="text-black">{menu.Category.name}</td>
                    <td className="text-black">
                        <button onClick={handleIngredients} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                            Show
                        </button>
                    </td>
                    <td className="text-black">{menu?.User?.username}</td>
                    <td className="text-black">{menu.description}</td>
                    <td>
                        <div>
                            <button
                                onClick={() => onDelete()}
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-3 rounded text-xs mr-2"
                            >
                                Delete
                            </button><br />
                            <button
                                onClick={() => (window.location.href = `/menu/form/${menu.id}`)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1.5 px-3 rounded text-xs mr-2"
                            >
                                Update
                            </button>
                        </div>


                    </td>
                </tr>
            </tbody >
        </>
    )
}
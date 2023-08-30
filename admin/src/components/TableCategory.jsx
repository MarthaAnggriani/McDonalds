import Swal from "sweetalert2";
import { deleteCategory } from "../stores/actions/actionCreator";
import { useDispatch } from "react-redux";

export default function TableCategory(props) {
    const { category } = props;
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
                dispatch(deleteCategory(category.id));
                // Swal.fire(
                //     'Category has been deleted.'
                // )
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        })
    }

    return (
        <>
            <tbody className="text-center">
                <tr className="border">
                    <td className="text-black">{category.name}</td>
                    <td>
                        <div>
                            <button
                                onClick={() => onDelete()}
                                className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-3 rounded text-xs mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => (window.location.href = `/category/form/${menu.id}`)}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1.5 px-3 rounded text-xs mr-2"
                            >
                                Update
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </>
    )
}
import '../App.css';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import PhonebookItem from "./PhonebookItem"

export default function PhonebookTable(props) {
    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;
    // const { phonebooks } = useSelector(state => ({
    //     phonebooks: state.phonebooks
    // }), shallowEqual)

    // const offsetRef = useRef(0)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     offsetRef.current = 0
    //     //dispatch(loadPhonebook(props.searchData.name ? props.searchData.name : "", props.searchData.phone ? props.searchData.phone : "", 10, offsetRef.current))
    // }, [dispatch, props.searchData.name, props.searchData.phone])

    // const handleScroll = useCallback(() => {
    //     if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         if (offsetRef.current <= (Math.ceil(phonebooks.dataCount / 10) - 1)) {
    //             offsetRef.current++
    //             //dispatch(loadMorePhonebook(props.searchData.name ? props.searchData.name : "", props.searchData.phone ? props.searchData.phone : "", 10, offsetRef.current))
    //         }
    //     }
    // }, [dispatch, phonebooks, props.searchData.name, props.searchData.phone])

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    // }, [handleScroll]);

    // const nodeList = phonebooks?.data?.map((item, index) => (
    //     <PhonebookItem
    //         key={item.id}
    //         index={index}
    //         id={item.id}
    //         name={item.name}
    //         phone={item.phone}
    //         searchReset={props.searchReset} />
    // ))

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.getPhonebooks.map((item, index) => <PhonebookItem
                    key={item.id}
                    index={index}
                    id={item.id}
                    name={item.name}
                    phone={item.phone}
                    searchReset={props.searchReset}
                />)}
            </tbody>
        </table>
    )
}

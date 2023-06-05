import GroupsList from "../components/lists/GroupsList";
import Header from "components/Header";

function List() {
    const groups = [
        '1 группа', '2 группа', '3 группа', '4 группа'
    ];

    const subject = 'Технологии программирования (6 семестр)';

    return (
        <>
            <Header />
            <GroupsList groups={groups} subject={subject} />
        </>
    );
}

export default List;
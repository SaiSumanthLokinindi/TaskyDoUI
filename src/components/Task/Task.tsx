import Flex from '../Flex/flex';

const Task = () => {
    return (
        <Flex>
            <input type="checkbox" />
            <Flex direction="column">
                <span>Some label about the task</span>
                <Flex justifyContent="space-between">
                    <span>Due in two days</span>
                    <span>critical</span>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Task;

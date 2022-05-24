import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Center, Text } from 'native-base';
import { WIDTH } from '../const/style.const';
interface Props {
    item: { text: string; color: string };
    onClose: Dispatch<SetStateAction<boolean>>;
}
export const ScreenItem = ({ item, onClose }: Props) => {
    return (
        <Box height={'full'} w={WIDTH}>
            <Center flex={1} bg={item.color}>
                <Box bg={'black.100'} w={'100px'} h={'100px'} alignItems={'center'}>
                    <Text color={'white.100'}>{item?.text}</Text>
                </Box>
                <Button onPress={() => onClose(false)}>Close</Button>
            </Center>
        </Box>
    );
};

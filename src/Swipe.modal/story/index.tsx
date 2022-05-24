import React, { useState } from 'react';
import { Box, Button, ScrollView, View } from 'native-base';
import { Dimensions } from 'react-native';
import { ScreenItem } from './screen.item';
import { HEIGHT, WIDTH } from '../const/style.const';
import { BottomView } from '../bottom.sheet';

const DUMP = [
    { text: 'ONE', color: 'red.100' },
    { text: 'TWO', color: 'blue.100' },
    { text: 'THREE', color: 'yellow.100' },
    { text: 'FOUR', color: 'green.100' },
];

export const StoryScreen = () => {
    const SNAP_POINT = DUMP.map((_, i) => i * WIDTH);
    const [open, setOpen] = useState(false);
    return (
        <Box flex={1} w={WIDTH} h={HEIGHT}>
            <Box bg={'gren.200'} flex={1} alignItems={'center'} justifyContent={'center'}>
                <Button onPress={() => setOpen(true)}>Press me</Button>
            </Box>
            <BottomView isOpen={open} onClose={setOpen}>
                <ScrollView horizontal snapToOffsets={SNAP_POINT}>
                    {DUMP.map((v) => (
                        <ScreenItem item={v} onClose={setOpen} />
                    ))}
                </ScrollView>
            </BottomView>
        </Box>
    );
};

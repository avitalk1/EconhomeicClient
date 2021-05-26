import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import { ListItem } from 'react-native-elements'
import { MONTHS_NAMES } from '../common/chartsFunctions'

function DropDown(props) {
    const [expanded, setExpanded] = useState(false)
    const [accordionTitle, setAccordionTitle] = useState(props.initOption)
    const handlePick = (val) => {
        handleSetExpended();
        if(props.isMonths){
            setAccordionTitle(MONTHS_NAMES[val])
        }else{
            setAccordionTitle(val)
        }
        if(props.isCompare != false){
            if(props.isMonths ){
                props.handlePickDropDown({
                    index: props.isCompare, 
                    month:val
                })
            }else{
                props.handlePickDropDown({
                    index: props.isCompare, 
                    year:val
                })
            }
        }else{
            props.handlePickDropDown(val)
        }
    }
    const handleSetExpended = () => {
        props.handleExpendEvent(!expanded)
        setExpanded(!expanded);
    }
    useEffect(()=>{
        setAccordionTitle(props.initOption)
    },[props.initOption])
    return (
        <View style={{width:props.width}}>
            <ListItem.Accordion
            containerStyle={{ paddingTop:5, paddingBottom:5, paddingLeft:10}}
                content={
                    <>
                        <ListItem.Content
                        >
                            <ListItem.Title>{accordionTitle}</ListItem.Title>
                        </ListItem.Content>
                    </>
                }
                isExpanded={expanded}
                onPress={handleSetExpended}
            >
                <ScrollView style={{height:100}}>
                    {props.dropDownOptions.map((op) => (
                        <ListItem key={op.value} onPress={() => handlePick(op.value)} containerStyle={{ paddingTop:5, paddingBottom:5, paddingLeft:10}} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{op.label}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    ))}
                </ScrollView>
            </ListItem.Accordion>
        </View>
    );
}
export default DropDown;
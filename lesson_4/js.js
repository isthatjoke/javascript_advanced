const text = "It was exam time at Joe's school.\ " +
    "Every day, their teacher gave them loads of homework and told them they should be working hard so as\ " +
    "to do well in their tests. Joe didn't take any notice. He reckoned he would rather be playing football.\ " +
    "He didn't care if he came bottom in the exams. His mum and dad told him that he should be working\ " +
    "harder but the weather was sunny and Joe had better things to do. 'Shall we go to the park?'\ " +
    "he said to his friend Finn one afternoon. 'We could take a football and have a kick around.'\ " +
    "Finn shook his head. 'I need to revise,' he said. 'I'm going home to do some maths. 'Joe was amazed.\ " +
    "'You'd rather do maths than football?' 'Maths is important. Besides, my mum says she'll buy me a mountain bike\ " +
    "if I do well.' 'That's crazy,' said Joe. Finn shrugged. 'Wait until I beat you in the test and you watch\ " +
    "me riding past on my mountain bike!' 'You won't beat me,' said Joe. 'Oh yes I will.' 'Oh no you won't!\ " +
    "Just you wait and see!'"
//1
const regexp1 = /'/igm

const new_text1 = text.replace(regexp1, '"')
console.log(new_text1)
//2
const regexp2 = /(^')\b|(')\B|\s(')/g

const new_text2 = text.replace(regexp2, '"')
console.log(new_text2)


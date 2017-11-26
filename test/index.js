const zscale = require('./../');

const test = (title, d, input) => {
	const json = JSON.stringify(d.value);
	const func = zscale.generate(d);
	console.log(`

	 ${title}关系
	 配置: ${json}
	 输入: ${input}
	 输出: ${func(input)}

	`);
}

const getSchema = (type) => ({
	type: 'gradient',
	value: {
		domain: {
			min: 0.001,
			max: 2
		},
		range: {
			min: 0.001,
			max: 3
		},
		easing: type
	}
});

const input = 1.1;

[{
	name: '线性',
	type: 'linear'
},{
	name: '幂次',
	type: 'pow'
},{
	name: '对数',
	type: 'log'
}].forEach(
	d => test(d.name, getSchema(d.type), input)
);




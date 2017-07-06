module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public\/)/,
		loader: 'babel-loader'
	},
	{
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader?importLoaders=1'],
		exclude: ['node_modules']
	},
	{
		test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: 'file-loader'
	}
];

import webpackConfig from './../../../webpack.config'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import config from './../config/config'

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.assets.port, config.assets.host, (err, result) => {
  if (err) { console.log(err) }
})

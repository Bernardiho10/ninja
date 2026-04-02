import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import commonjs from '@rollup/plugin-commonjs';
import {glob} from 'glob';

// Find all JS files in src and subdirectories
const inputFiles = glob.sync('./src/**/*.js'); 

export default {
    input: inputFiles,
    output: {
        dir: 'public/assets/js',
        format: 'esm',
        sourcemap: false,
        preserveModules: true, 
        preserveModulesRoot: 'src', 
    },
    plugins: [
        copy({
            targets: [
                // Copy all CSS files from src and subdirectories to assets/css
                {src: 'src/**/*.css', dest: 'public/assets/css', rename: (name, extension, fullPath) => {
                    return fullPath.replace(/src[\\\/]/, '').replace(/\\/g, '/');
                }},
                // Copy any other static assets if they exist
                {src: 'src/assets/**/*', dest: 'public/assets'}
            ]
        }),
        nodeResolve(),
        commonjs()
    ]
}
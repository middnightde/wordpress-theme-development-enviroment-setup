const { exec } = require('child_process');

function command(cmd, con_msg) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
            }
            console.log(`Completed: ${con_msg}`);
            resolve();
        });
    });
}

async function runCommands() {
    try {
        // clear theme
        await command("rm -rf inc js languages template-parts", "Deleted unnecessary folders");
        await command("rm -rf style-rtl.css .eslintrc .stylelintrc.json composer.json package.json README.md LICENSE phpcs.xml.dist readme.txt", "Deleted unnecessary files");
        await command("rm -rf comments.php search.php sidebar.php", "Deleted unnecessary php files");
        await command("mkdir inc js css img fonts template-parts", "Created folders");

        // setup package.json
        await command("npm init -y", "Created package.json");
        await command("npm pkg set author='Middendorf Midnight GmbH'", "package.json added author");
        await command("npm pkg delete keywords", "package.json deleted keywords");
        await command("npm pkg delete license", "package.json deleted license");

        // install hexel.js
        await command("npm pkg delete scripts.test", "package.json scripts deleted test");
        await command("npm pkg set scripts.prehexel_install='curl -o gulpfile.js https://raw.githubusercontent.com/thedroelfi/hexel.js/main/gulpfile.js'", "package.json scripts registered prehexel_install");
        await command("npm pkg set scripts.hexel_install='npm i --save-dev gulp gulp-uglify gulp-concat gulp-purgecss gulp-concat-css gulp-clean-css'", "package.json scripts registered hexel_install");
        await command("npm pkg set scripts.hexel_uninstall='npm uninstall gulp gulp-uglify gulp-concat gulp-purgecss gulp-concat-css gulp-clean-css'", "package.json scripts registered hexel_uninstall");
        await command("npm pkg set scripts.posthexel_uninstall='rm -r gulpfile.js'", "package.json scripts registered posthexel_uninstall");
        await command("npm pkg set scripts.hexel_config='curl -o hexel-config.js https://raw.githubusercontent.com/thedroelfi/hexel.js/main/hexel-config.js'", "package.json scripts registered hexel_config");
        await command("npm pkg set scripts.prehexel_js='npm run hexel_install'", "package.json scripts registered prehexel_js");
        await command("npm pkg set scripts.hexel_js='gulp hexel_build_js'", "package.json scripts registered hexel_js");
        await command("npm pkg set scripts.posthexel_js='npm run hexel_uninstall'", "package.json scripts registered posthexel_js");
        await command("npm pkg set scripts.prehexel_css='npm run hexel_install'", "package.json scripts registered prehexel_css");
        await command("npm pkg set scripts.hexel_css='gulp hexel_build_css'", "package.json scripts registered hexel_css");
        await command("npm pkg set scripts.posthexel_css='npm run hexel_uninstall'", "package.json scripts registered posthexel_css");
        await command("curl -o hexel-config.js https://raw.githubusercontent.com/thedroelfi/hexel.js/main/hexel-config.js", "hexel config installed");

        // install theme export
        await command("npm pkg set scripts.pretheme_export='mkdir $(pwd | rev | cut -d'/' -f 1 | rev); cp -r * $(pwd | rev | cut -d'/' -f 1 | rev); cd $(pwd | rev | cut -d'/' -f 1 | rev); rm -r .idea; rm -r $(pwd | rev | cut -d'/' -f 1 | rev); cd ../'", "package.json scripts registered pretheme_export");
        await command("npm pkg set scripts.theme_export='zip -r $(pwd | rev | cut -d'/' -f 1 | rev).zip $(pwd | rev | cut -d'/' -f 1 | rev)'", "package.json scripts registered theme_export");
        await command("npm pkg set scripts.posttheme_export='rm -r $(pwd | rev | cut -d'/' -f 1 | rev)'", "package.json scripts registered posttheme_export");

        // finish
        await command("rm -rf theme-setup.js", "setup completed");

    } catch (error) {
        console.error('Error executing commands:', error);
    }
}

runCommands();
#!/usr/bin/env node
import { resolve } from 'path';
import { fork } from 'child_process';
import * as yargs from 'yargs';
import startClient from './start';
import buildClient from './build';

type Argv = yargs.Arguments<{
  test?: boolean;
}>;

const spinnerProcess = fork(resolve(__dirname, './spinner')); // 单独创建子进程跑 spinner 否则会被后续的 require 占用进程导致 loading 暂停
const debug = require('debug')('ssr:cli');
const start = Date.now();
const spinner = {
  start: () =>
    spinnerProcess.send({
      message: 'start',
    }),
  stop: () =>
    spinnerProcess.send({
      message: 'stop',
    }),
};

yargs
  .command('start', 'Start Server', {}, async () => {
    spinner.start();
    process.env.NODE_ENV = 'development';
    debug(`require ssr-server-utils time: ${Date.now() - start} ms`);
    await startClient();
    debug(`loadPlugin time: ${Date.now() - start} ms`);
    spinner.stop();
  })
  .command('build', 'Build server and client files', {}, async (argv: Argv) => {
    spinner.start();
    if (argv.test) {
      process.env.BUILD_ENV = 'test';
    } else {
      process.env.BUILD_ENV = 'production';
    }
    process.env.NODE_ENV = 'production';

    await buildClient();

    spinner.stop();
  })
  .option('version', {
    alias: 'v',
    default: false,
  })
  .fail((msg, err) => {
    if (err) {
      console.log(err);
      spinner.stop();
      process.exit(1);
    }
    console.log(msg);
  })
  .parse();

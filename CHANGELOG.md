# Changelog

# [4.0.0](https://github.com/npm/read-package-json/compare/v3.0.1...v4.0.0) (2021-08-18)


### Bug Fixes

* **parseError:** use file not path attribute ([5002e00](https://github.com/npm/read-package-json/commit/5002e00))


### BREAKING CHANGES

* **parseError:** rename file attribute to path

In order to align with the way our other "fast" json parsers work the
err.file attribute needs to be renamed to err.path.

Also other errors i.e. ENOENT attach a path attribute.



<a name="3.0.1"></a>
## [7.0.0](https://github.com/npm/read-package-json/compare/v6.0.4...v7.0.0) (2023-08-15)

### ⚠️ BREAKING CHANGES

* support for node 14 has been removed

### Bug Fixes

* [`2845aa5`](https://github.com/npm/read-package-json/commit/2845aa5ee0fdd0c20fd385f8e9bea4119dd8de2a) [#187](https://github.com/npm/read-package-json/pull/187) drop node14 support (@lukekarrys)

### Dependencies

* [`3c10858`](https://github.com/npm/read-package-json/commit/3c10858a4230bc750a4e0522465e4e6e7f0d2cb9) [#186](https://github.com/npm/read-package-json/pull/186) bump normalize-package-data from 5.0.0 to 6.0.0

## [6.0.4](https://github.com/npm/read-package-json/compare/v6.0.3...v6.0.4) (2023-05-31)

### Bug Fixes

* [`d8eca92`](https://github.com/npm/read-package-json/commit/d8eca922bb6a99fc84c4d5585ea4d3de7137f911) [#177](https://github.com/npm/read-package-json/pull/177) prevent directory.bin referencing outside the package root (#177) (@antongolub)

## [6.0.3](https://github.com/npm/read-package-json/compare/v6.0.2...v6.0.3) (2023-05-03)

### Bug Fixes

* [`7b516f1`](https://github.com/npm/read-package-json/commit/7b516f18dd84055f330a44a596bc7fc68c6f2c31) [#174](https://github.com/npm/read-package-json/pull/174) use jsonClone to fix cache layer (#174) (@antongolub)

## [6.0.2](https://github.com/npm/read-package-json/compare/v6.0.1...v6.0.2) (2023-04-27)

### Dependencies

* [`30cea18`](https://github.com/npm/read-package-json/commit/30cea18041ae857d27e720fda576c2d43a535fe3) [#170](https://github.com/npm/read-package-json/pull/170) bump glob from 9.3.5 to 10.2.2 (#170)

## [6.0.1](https://github.com/npm/read-package-json/compare/v6.0.0...v6.0.1) (2023-03-21)

### Dependencies

* [`bd925f0`](https://github.com/npm/read-package-json/commit/bd925f0abd1a30688de37f45d1612c5e8053b88f) [#162](https://github.com/npm/read-package-json/pull/162) bump glob from 8.1.0 to 9.3.0 (#162)

## [6.0.0](https://github.com/npm/read-package-json/compare/v5.0.2...v6.0.0) (2022-10-14)

### ⚠️ BREAKING CHANGES

* `read-package-json` is now compatible with the following semver range for node: `^14.17.0 || ^16.13.0 || >=18.0.0`

### Features

* [`0952b2c`](https://github.com/npm/read-package-json/commit/0952b2c6ba94bc1caaca68cc88aba95c0c22a99b) [#140](https://github.com/npm/read-package-json/pull/140) postinstall for dependabot template-oss PR (@lukekarrys)

### Dependencies

* [`16f6e31`](https://github.com/npm/read-package-json/commit/16f6e3181240bfa9a748df795483d80ddeb0d15d) [#150](https://github.com/npm/read-package-json/pull/150) bump normalize-package-data from 4.0.1 to 5.0.0
* [`d736548`](https://github.com/npm/read-package-json/commit/d7365487d46c5bcf0e0a33a4bd7edaf8175a7658) [#148](https://github.com/npm/read-package-json/pull/148) bump npm-normalize-package-bin from 2.0.0 to 3.0.0
* [`505edd7`](https://github.com/npm/read-package-json/commit/505edd7703f9eb75e05656e5e2f1c0b34b669378) [#147](https://github.com/npm/read-package-json/pull/147) bump json-parse-even-better-errors from 2.3.1 to 3.0.0

## [5.0.2](https://github.com/npm/read-package-json/compare/v5.0.1...v5.0.2) (2022-08-23)


### Dependencies

* bump npm-normalize-package-bin from 1.0.1 to 2.0.0 ([#129](https://github.com/npm/read-package-json/issues/129)) ([6ce5501](https://github.com/npm/read-package-json/commit/6ce55010e88f83a4d59097e5583e4a8715260a63))

### [5.0.1](https://github.com/npm/read-package-json/compare/v5.0.0...v5.0.1) (2022-04-20)


### Dependencies

* bump glob from 7.2.0 to 8.0.1 ([#124](https://github.com/npm/read-package-json/issues/124)) ([ddd4a2a](https://github.com/npm/read-package-json/commit/ddd4a2aecb327c0884e7d6641f20255abcc464c6))

## [5.0.0](https://www.github.com/npm/read-package-json/compare/v4.1.2...v5.0.0) (2022-03-15)


### ⚠ BREAKING CHANGES

* This drops support for node10 and non-LTS versions of node12 and node14

### Bug Fixes

* always use / in package.json paths ([18cc3fa](https://www.github.com/npm/read-package-json/commit/18cc3faafae4aa39d5c5243feb5240a55da64965))
* move files to lib ([bd7fac4](https://www.github.com/npm/read-package-json/commit/bd7fac4862a6f230bc0e37b3483079cf9a49c275))


* @npmcli/template-oss@2.9.2 ([2122bc2](https://www.github.com/npm/read-package-json/commit/2122bc20231dfd0d6cee85e014e118f12192cdfc))


### Dependencies

* bump normalize-package-data from 3.0.3 to 4.0.0 ([#113](https://www.github.com/npm/read-package-json/issues/113)) ([b905443](https://www.github.com/npm/read-package-json/commit/b90544351fea84cf557572509129e84c06e8be45))
* update glob requirement from ^7.1.1 to ^7.2.0 ([#115](https://www.github.com/npm/read-package-json/issues/115)) ([35482c4](https://www.github.com/npm/read-package-json/commit/35482c48afde7d7d3fc647416acfb30a9c753b1d))
* update json-parse-even-better-errors requirement ([#116](https://www.github.com/npm/read-package-json/issues/116)) ([1b1b3f0](https://www.github.com/npm/read-package-json/commit/1b1b3f0a979d1f6cd4a46b86b21abe020d849052))
* update npm-normalize-package-bin requirement from ^1.0.0 to ^1.0.1 ([#114](https://www.github.com/npm/read-package-json/issues/114)) ([d1f64a5](https://www.github.com/npm/read-package-json/commit/d1f64a5d8250cc96df2f21200f92c5633418b33e))

## [3.0.1](https://github.com/npm/read-package-json/compare/v3.0.0...v3.0.1) (2021-02-22)


### Bug Fixes

* Strip underscore prefixed fields from file contents ([ac771d8](https://github.com/npm/read-package-json/commit/ac771d8))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/npm/read-package-json/compare/v2.1.2...v3.0.0) (2020-10-13)


### Bug Fixes

* check-in updated lockfile ([19d9fbe](https://github.com/npm/read-package-json/commit/19d9fbe))



<a name="2.1.2"></a>
## [2.1.2](https://github.com/npm/read-package-json/compare/v2.1.1...v2.1.2) (2020-08-20)


### Bug Fixes

* even better json errors, remove graceful-fs ([fdbf082](https://github.com/npm/read-package-json/commit/fdbf082))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/npm/read-package-json/compare/v2.1.0...v2.1.1) (2019-12-09)


### Bug Fixes

* normalize and sanitize pkg bin entries ([b8cb5fa](https://github.com/npm/read-package-json/commit/b8cb5fa))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/npm/read-package-json/compare/v2.0.13...v2.1.0) (2019-08-13)


### Features

* support bundleDependencies: true ([76f6f42](https://github.com/npm/read-package-json/commit/76f6f42))



<a name="2.0.13"></a>
## [2.0.13](https://github.com/npm/read-package-json/compare/v2.0.12...v2.0.13) (2018-03-08)


### Bug Fixes

* **git:** support git packed refs --all mode ([#77](https://github.com/npm/read-package-json/issues/77)) ([1869940](https://github.com/npm/read-package-json/commit/1869940))

/*global document: false, angular: false */
(function () {
    'use strict';

    angular.module('simpleGrid', [])
        .directive('simpleGrid', function ($timeout) {
            var gridNum = 0;
            return {
                scope: {
                    simpleGrid: '='
                },

                link: function (scope, elem, attrs) {
                    scope.capitalize = function (str) {
                        if (!str) {
                            return str;
                        }
                        return str[0].toUpperCase() + str.slice(1);
                    };

                    scope.markDeleted = function (row) {
                        row.$deleted = true;
                        if (scope.simpleGrid.options && scope.simpleGrid.options.rowDeleted) {
                            scope.simpleGrid.options.rowDeleted(row);
                        }
                    };

                    scope.isInvalid = function (rowIndex) {
                        var formCtrl = scope.$eval(scope.formName(rowIndex));
                        return formCtrl.$error;
                    };

                    scope.keydown = function (event, rowIndex, colIndex) {
                        var elem, elems;
                        switch (event.keyCode) {
                        case 40: //down
                            elem = document.getElementById(scope.formName(rowIndex + 1));
                            event.preventDefault();
                            break;
                        case 38: //up
                            elem = document.getElementById(scope.formName(rowIndex - 1));
                            event.preventDefault();
                            break;
                        }
                        if (elem) {
                            elems = elem.getElementsByClassName('sg-column-' + colIndex);
                            if (elems.length) {
                                $timeout(function () {
                                    elems[0].focus();
                                });
                            }
                        }
                    };

                    scope.cellFocused = function (row, column) {
                        scope.selectedRow = row;
                        if (column) {
                            scope.simpleGrid.callbacks.cellFocused(row, column);
                        }
                    };

                    scope.formName = function (rowIndex) {
                        return 'simpleGrid' + scope.gridNum.toString() + 'Row' + rowIndex.toString();
                    };

                    scope.gridNum = gridNum;
                    gridNum += 1;

                },

                templateUrl: function (tElement, tAttrs) {
                    return document.getElementById('simple-grid.html').getAttribute('src');
                }
            };
        });
}());
# Import the os module, for the os.walk function
import os
import sys

import img2pdf

logFileName = 'logParse.txt'

logFile = open(logFileName, 'a')


def printandlog(str):
    print(str)
    logFile.write(str + "\n")
    return


def printandlogNoRC(str):
    print(str, end='')
    logFile.write(str)
    return


def printandlogTuple(tuple):
    print(tuple)
    logFile.write(''.join(tuple))
    return


def isImage(fname):
    if (fname.lower().rfind(".jpg") == len(fname) - 4):
        return True
    if (fname.lower().rfind(".jpeg") == len(fname) - 5):
        return True
    if (fname.lower().rfind(".gif") == len(fname) - 4):
        return True
    if (fname.lower().rfind(".png") == len(fname) - 4):
        return True
    if (fname.lower().rfind(".tif") == len(fname) - 4):
        return True
    if (fname.lower().rfind(".tiff") == len(fname) - 5):
        return True
    return False


def isMultiPage(dirname):
    if (len(dirname) < 2):
        return FALSE;
    if (dirname.lower().rfind("_x") == len(dirname) - 2):
        return True
    return False


def isMultiPageMarkerFile(fname):
    if (fname.find("multi.txt") == 0):
        return True
    return False


def stripExtension(fname):
    pos = fname.rfind(".")
    if pos == -1:
        return fname
    if pos == len(fname) - 4:
        return fname[0:pos]
    if pos == len(fname) - 5:
        return fname[0:pos]
    return fname


print("A sound will be produced at the end of the processing.")
print("What follows is also logged at the end of the file " + logFileName + "\r\n")
print('Press <ctrl>+C to abort')
printandlog("########################################")

# Set the directory you want to start from
rootDir = '.'
failedFiles = ();
failedfilesCount = 0
for dirName, subdirList, fileList in os.walk(rootDir):
    files = ();
    found = 0;
    nbpages = 0
    multidir = False
    # isMultiPage(dirname)
    for fname in fileList:
        if (isImage(fname)):
            found = 1;
            nbpages = nbpages + 1
            newTuple = (dirName + '/' + fname,);
            files = files + newTuple
        if isMultiPageMarkerFile(fname):
            multidir = True
    if (found == 1):
        if (multidir == True):
            #	extract the name of the directory
            outfile = dirName + '.pdf';
            printandlogNoRC('-->%s (%i pages)' % (outfile, nbpages))
            try:
                with open(outfile, "wb") as f:
                    try:
                        f.write(img2pdf.convert(*files))
                        f.flush()
                        f.close()
                        printandlog(' ')
                    except MemoryError:
                        f.close()
                        printandlog(
                            '--->>> **********conversion to pdf failed by lack of memory, too many files or too long file path ???**********')
                        newFailedFilesTuple = (outfile + '	',);
                        failedFiles = failedFiles + newFailedFilesTuple
                        failedfilesCount = failedfilesCount + 1
                    except img2pdf.ImageOpenError:
                        f.close()
                        printandlog(
                            '--->>> **********conversion to pdf failed due to a bad jpeg file format???**********')
                        newFailedFilesTuple = (outfile + '	',);
                        failedFiles = failedFiles + newFailedFilesTuple
                        failedfilesCount = failedfilesCount + 1
            except KeyboardInterrupt:
                sys.exit(0)
                break
            except IOError:
                printandlog(
                    '--->>> **********conversion to pdf failed because we cannot create/replace the pdf file. Is it already open in acrobat reader ? Please close it if that is the case. **********')
                newFailedFilesTuple = (outfile + '	',);
                failedFiles = failedFiles + newFailedFilesTuple
                failedfilesCount = failedfilesCount + 1
            except:
                printandlog('--->>> **********conversion to pdf failed for some unclear reason. **********')
                newFailedFilesTuple = (outfile + '	',);
                failedFiles = failedFiles + newFailedFilesTuple
                failedfilesCount = failedfilesCount + 1


        else:
            for fname in files:
                outfile = stripExtension(fname) + '.pdf';

                #	extract the name of the directory

                printandlogNoRC('-->%s (1 page)' % (outfile))
                try:
                    with open(outfile, "wb") as f:
                        try:
                            f.write(img2pdf.convert(fname))
                            f.flush()
                            f.close()
                            printandlog(' ')
                        except MemoryError:
                            f.close()
                            printandlog(
                                '--->>> **********conversion to pdf failed by lack of memory, too many files or too long file path ???**********')
                            newFailedFilesTuple = (outfile + '	',);
                            failedFiles = failedFiles + newFailedFilesTuple
                            failedfilesCount = failedfilesCount + 1
                        except img2pdf.ImageOpenError:
                            f.close()
                            printandlog(
                                '--->>> **********conversion to pdf failed due to a bad jpeg file format???**********')
                            newFailedFilesTuple = (outfile + '	',);
                            failedFiles = failedFiles + newFailedFilesTuple
                            failedfilesCount = failedfilesCount + 1
                except KeyboardInterrupt:
                    sys.exit(0)
                    break
                except IOError:
                    printandlog(
                        '--->>> **********conversion to pdf failed because we cannot create/replace the pdf file. Is it already open in acrobat reader ? Please close it if that is the case. **********')
                    newFailedFilesTuple = (outfile + '	',);
                    failedFiles = failedFiles + newFailedFilesTuple
                    failedfilesCount = failedfilesCount + 1
                except:
                    printandlog('--->>> **********conversion to pdf failed for some unclear reason. **********')
                    newFailedFilesTuple = (outfile + '	',);
                    failedFiles = failedFiles + newFailedFilesTuple
                    failedfilesCount = failedfilesCount + 1

if (failedfilesCount > 0):
    printandlog(
        '\r\n\r\n%i file(s) could not be converted (see potential reason looking up), here is the list :' % failedfilesCount)
    printandlogTuple(failedFiles)
    printandlog(
        '\r\nIf it is by lack of memory you might just try to go parse directly these only. It can work. Using the 64 bits version of python might help also. Starting the tool from the command line can also make the difference !');
else:
    printandlog('All files converted with NO ERROR')

print("See also at the end of the log file " + logFileName + "\r\n")

logFile.close()
# BELL
print('\a')
os.system("pause")
